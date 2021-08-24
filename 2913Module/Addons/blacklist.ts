import { existsSync, readFileSync, writeFileSync } from "fs";
import { command } from "bdsx/command";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { bool_t, CxxString } from "bdsx/nativetype";
import { sendText, XuidByName, Disconnect, IdByName } from "../index";
import { serverInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { CANCEL } from "bdsx/common";
import { bedrockServer } from "../../../bdsx/launcher";

const localfile = './blacklist.json';

class blockedPlayer {
    Name: string;
    Ip: string;
    xuid: string;
    reason: string;
}

let blackList:blockedPlayer[] = [];

if (!existsSync(localfile)) writeFileSync(localfile, "[]", "utf8");
else {
    try {
        blackList = JSON.parse(readFileSync(localfile, "utf8"));
    } catch(err) {
        console.log('[2913: blacklist] '.green+`ReadError\n${err}`);
    }
}

command.register("ban_", "[2913] Ban command / 추방 명령어", CommandPermissionLevel.Operator).overload((p, o, out)=>{
    if (o.isScriptCommandOrigin()) {
        console.error("SCRIPT CANNOT USE 'ban_' COMMAND!!!".red);
        return;
    }
    const sendMsg = (text:string, toAll?:boolean)=>{
        const actor = o.getEntity();
        if (toAll === true) {
            console.log('[2913: blacklist] '.green+text);
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§a[2913: blacklist] §r${text}"}]}`);
        } else {
            if (o.isServerCommandOrigin()) console.log('[2913: blacklist] '.green+text);
            else if (actor !== null) {
                sendText(actor.getNetworkIdentifier(), text);
            }
        }
    }
    switch (p.option) {
        case undefined:
            sendMsg(`blackList options ===\n/ban_ add <playerName> [useIPban?:boolean] [reason?:string] - Add player to blacklist / 대상 플레이어를 블랙리스트에 추가합니다\n/ban_ list [page?:number] - List of players in blackList / 블랙리스트에 있는 플레이어 목록을 봅니다\n/ban_ remove <playerName> - Remove player from blacklist / 대상 플레이어를 블랙리스트에서 제거합니다`);
            break;

        case "add":
            if (p.target === undefined) {
                sendMsg('§cNo target!');
                return;
            }
            const f = blackList.find((v)=>v.Name === p.target);
            if (f !== undefined) {
                sendMsg(`§c${p.target} is already in BlackList`);
                return;
            }
            const player = new blockedPlayer();
            player.Name = p.target;
            const pf = serverInstance.minecraft.getLevel().players.toArray().find((v)=>v.getName() === p.target);
            if (pf !== undefined) {
                player.xuid = XuidByName(pf.getName());
                if (p.useIPban !== undefined && p.useIPban) player.Ip = String(pf.getNetworkIdentifier()).split("|")[0];
            }
            if (p.reason !== undefined) player.reason = p.reason;
            blackList.push(player);
            let reason = '';
            if (p.reason !== undefined) reason = `\n§6REASON§f: ${p.reason}`;
            if (p.useIPban !== undefined && p.useIPban) sendMsg(`§a${p.target} is IP Banned!${reason}`, true);
            else sendMsg(`§a${p.target} is Banned!${reason}`, true);
            writeFileSync(localfile, JSON.stringify(blackList, null, 4), "utf8");
            let targetId = IdByName(p.target);
            if (targetId !== undefined) {
                if (p.useIPban !== undefined && p.useIPban) Disconnect(targetId, "§l§c[2913:blacklist] YOU ARE IP BANNED!"+reason);
                else Disconnect(targetId, "§l§c[2913:blacklist] YOU ARE BANNED!"+reason);
            }
            break;

        case "remove":
            if (p.target === undefined) {
                sendMsg('§cNo target!');
                return;
            }
            const fr = blackList.find((v)=>v.Name === p.target);
            if (fr === undefined) {
                sendMsg(`§c${p.target} isn't in blackList`);
                return;
            }
            blackList.splice(blackList.indexOf(fr), 1);
            writeFileSync(localfile, JSON.stringify(blackList, null, 4), "utf8");
            sendMsg(`§a${p.target} is UnBanned!`);
            break;

        case "list":
            let page = 1;
            if (p.target !== undefined) page = Number(p.target);
            if (isNaN(page)) page = 1;
            if (page < 1) page = 1;
            const listArr:string[] = [];
            blackList.forEach((v)=>{
                let ip = "unknown";
                let xuid = "unknown";
                if (v.Ip !== undefined) ip = v.Ip;
                if (v.xuid !== undefined) xuid = v.xuid;
                listArr.push(`${v.Name} - IP: ${ip}, Xuid: ${xuid}`);
            });
            let maxPage = Math.ceil(listArr.length/5);
            if (page > maxPage) page = maxPage;
            listArr.splice(0, 5*(page-1));
            sendMsg(`=== §6blackList §b${page}/${maxPage}Page §r===\n`+listArr.join('\n'));
            break;

        default:
            break;
    }
    return out.success();
}, {
    option: [CxxString, true],
    target: [CxxString, true],
    useIPban: [bool_t, true],
    reason: [CxxString, true]
});

events.packetAfter(MinecraftPacketIds.Login).on((pkt, target)=>{
    const conq = pkt.connreq;
    if (conq === null) return;
    const cert = conq.cert;
    const playerName = cert.getId();
    const playerXuid = cert.getXuid();
    const ip = String(target).split("|")[0];
    let f = blackList.find((v)=>v.Name === playerName);
    let reason = '';
    if (f !== undefined) {
        if (f.xuid === undefined) f.xuid = playerXuid;
        writeFileSync(localfile, JSON.stringify(blackList, null, 4), "utf8");
        if (f.reason !== undefined) reason = `\n§6REASON§f: ${f.reason}`;
        Disconnect(target, "§c§l[2913:blacklist] YOU ARE BANNED!"+reason);
        return CANCEL;
    } else {
        f = blackList.find((v)=>v.xuid === playerXuid);
        if (f !== undefined) {
            if (f.reason !== undefined) reason = `\n§6REASON§f: ${f.reason}`;
            Disconnect(target, "§c§l[2913:blacklist] YOU ARE BANNED!"+reason);
            return CANCEL;
        } else {
            f = blackList.find((v)=>v.Ip === ip);
            if (f !== undefined) {
                if (f.reason !== undefined) reason = `\n§6REASON§f: ${f.reason}`;
                Disconnect(target, "§c§l[2913:blacklist] YOU ARE IP BANNED!"+reason);
                return CANCEL;
            }
        }
    }
});