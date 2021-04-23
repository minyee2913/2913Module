import { bedrockServer, CANCEL, PacketId } from "bdsx";
import { events } from "bdsx/event";
import { white, yellow } from "colors";
import { DataById } from "../packets/connection";
import { Disconnect } from "../packets/disconnect";
import { InventoryTransaction, transaction } from "../packets/inventoryTransaction";

const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_attacked_entity", eventData => {
    try {
        let eventer = eventData.data.player;
        let entity = eventData.data.attacked_entity;
        const eventerName = system.getComponent(eventer, "minecraft:nameable")!.data;
        const eventerPos = system.getComponent(eventer, "minecraft:position")!.data;
        const entityPos = system.getComponent(entity, "minecraft:position")!.data;
        let x = Math.abs(eventerPos.x - entityPos.x);
        let y = Math.abs(eventerPos.y - entityPos.y);
        let z = Math.abs(eventerPos.z - entityPos.z);
        if (x > 4.5 || y > 4.5 || z > 4.5) {
            system.executeCommand(`testfor @a[name="${eventerName}",m=!1]`, (edata) => {
                if (edata.data.statusCode === 0) {
                    bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§c§l${eventerName}님이 비정상 클라이언트로 인해 추방당했습니다"}]}`);
                    bedrockServer.executeCommand(`kick "${eventerName}" 비정상 클라이언트(리치)로 인해 추방당했습니다`);
                }
            });
        }
    }
    catch (err) { }
    ;
});
const Nametest = new Map();
events.packetAfter(PacketId.SetLocalPlayerAsInitialized).on((pkt, target) => {
    try {
        let name = DataById(target)[0];
        Nametest.set(target, name);
        return;
    }
    catch (_a) { }
});
let i = setInterval(() => {
    Nametest.forEach((v, k) => {
        try {
            let Entity = k.getActor().getEntity();
            let Name = system.getComponent(Entity, "minecraft:nameable")!.data.name;
            if (v != Name)
                Disconnect(k, '§c§l이름표 강제수정이 감지되었습니다!\n이름을 변경하시려면 xbox게이머 태그를 변경하세요!');
        }
        catch (_a) {
            Nametest.delete(k);
        }
    });
}, 10000);

events.serverStop.on(() => {
    clearInterval(i);
});
InventoryTransaction.on((pkt, target, ev) => {
    if (ev.type === transaction.TYPE_MISMATCH) {
        if (pkt[3] === 28 && pkt[8] === 99999) {
            setTimeout(() => { Disconnect(target, '§c§l비정상 클라이언트가 감지되었습니다'); }, 100);
            return CANCEL;
        }
    }
});
console.log(yellow('*') + white(' anticheat'));