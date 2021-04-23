import { ipfilter, command, netevent, MinecraftPacketIds, nethook, bedrockServer, Actor } from 'bdsx';
import { ActorWildcardCommandSelector, CommandPermissionLevel } from 'bdsx/bds/command';
import { events } from 'bdsx/event';
import { CxxString } from 'bdsx/nativetype';
import { green, white, yellow } from 'colors';
import { open, readFileSync, writeFileSync } from 'fs';
import { IdByName, Disconnect, NameById, playerPermission, playerList } from '..';
import { sendText } from '../packets';
ipfilter.setTrafficLimit(1000000);
ipfilter.setTrafficLimitPeriod(10*60);
///////////////////////////////////////////////////////////////////////

let config =
{
    LocalData: './ban.json',
    Ban_command: 'ban_',
    IpBan_command: 'ipban_',
    UnBan_command: 'unban_',
    Ban_msg: '§cYou are BANNED',
    IpBan_msg: '§cYou are Ip BANNED',
    UnBan_msg: '§a${target} is UNBANNED',
    announce: '§e${target} was BANNED By ${origin}'
}

//////////////////////////////////////////////////////////////////////

open(config.LocalData,'a+',function(err,fd){
if(err) throw err;
try {
    JSON.parse(readFileSync(config.LocalData, "utf8"));
} catch (err) {
    writeFileSync(config.LocalData, '{ "IpBan": [{"ip": "","name":""}], "NameBan": [] }', "utf8");
}
});

command.register(config.Ban_command, "ban Command", CommandPermissionLevel.Operator).overload((p, o, ut)=>{
    let targets:Actor[] = [];
    for (const actor of p.player.newResults(o)) {
        if (!actor.isPlayer()) {
            sendText(o.getName(), '§c§lOnly Player!!!');
            return;
        }
        targets.push(actor);
    }
    if (targets.length > 1) {
        sendText(o.getName(), '§c§lOnly 1 Player!!!');
        return;
    }
    let target = targets[0].getNetworkIdentifier();
    let targetName = NameById(target);
    console.log(`${targetName} banned`);
    bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"${config.announce.replace('${target}', `${targetName}`).replace('${origin}', `${o.getName()}`)}"}]}`);
    const BanJS = JSON.parse(readFileSync(config.LocalData, "utf8"));
    BanJS.NameBan.push(targetName);
    writeFileSync(config.LocalData, JSON.stringify(BanJS, null, 4), "utf8");
    if (playerList.includes(o.getName())) Disconnect(target, config.Ban_msg);
},{ player: ActorWildcardCommandSelector});
command.register(config.IpBan_command, "Ipban Command", CommandPermissionLevel.Operator).overload((p, o, ut)=>{
    let targets:Actor[] = [];
    for (const actor of p.player.newResults(o)) {
        if (!actor.isPlayer()) {
            sendText(o.getName(), '§c§lOnly Player!!!');
            return;
        }
        targets.push(actor);
    }
    if (targets.length > 1) {
        sendText(o.getName(), '§c§lOnly 1 Player!!!');
        return;
    }
    let target = targets[0].getNetworkIdentifier();
    let targetName = NameById(target);
    let [ip, port] = target.getAddress().split('|');
    let js = {
        ip: ip,
        name: targetName
    }
    console.log(`${o.getName()} Ip banned ${targetName}\nip : ${ip} port : ${port}`);
    bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"${config.announce.replace('${target}', `${targetName}`).replace('${origin}', `${o.getName()}`)}"}]}`);
    const BanJS = JSON.parse(readFileSync(config.LocalData, "utf8"));
    BanJS.IpBan.push(js);
    writeFileSync(config.LocalData, JSON.stringify(BanJS), "utf8");
    Disconnect(target, config.IpBan_msg);
},{ player: ActorWildcardCommandSelector});

command.register(config.UnBan_command, "Unban Command", CommandPermissionLevel.Operator).overload((p, o, ut)=>{
    let targetName = p.targetName;
    console.log(`${o.getName()} Unbanned ${targetName}`);
    bedrockServer.executeCommand(`tellraw @p[name="${o.getName()}"] {"rawtext":[{"text":"${config.UnBan_msg.replace('${target}', `${targetName}`).replace('${origin}', `${o.getName()}`)}"}]}`);
    const BanJS = JSON.parse(readFileSync(config.LocalData, "utf8"));
    let Nstate = BanJS.NameBan.indexOf(targetName);
    BanJS.NameBan.splice(Nstate, 1);
    let Ijs = BanJS.IpBan.map((e:any, i:any) => e.name);
    let Istate = Ijs.indexOf(targetName);
    BanJS.IpBan.splice(Istate, 1);
    writeFileSync(config.LocalData, JSON.stringify(BanJS, null, 4), "utf8");
},{ targetName: CxxString});

events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkidentifier, packetId) => {
    let target = String(networkidentifier);
    let targetName = NameById(networkidentifier);
    let [ip, port] = target.split('|');
    const BanJS = JSON.parse(readFileSync(config.LocalData, "utf8"));
    let Ijs = BanJS.IpBan.map((e:any, i:any) => e.ip);
    setTimeout(function(){
        if (BanJS.NameBan.includes(targetName)) Disconnect(networkidentifier, config.Ban_msg);
        if (Ijs.includes(ip)) Disconnect(networkidentifier, config.IpBan_msg);
    }, 3000)
})


console.log(yellow('*') + white(' ban'));
export {};