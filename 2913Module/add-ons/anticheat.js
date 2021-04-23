"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const connection_1 = require("../packets/connection");
const disconnect_1 = require("../packets/disconnect");
const inventoryTransaction_1 = require("../packets/inventoryTransaction");
const system = server.registerSystem(0, 0);
system.listenForEvent("minecraft:player_attacked_entity", eventData => {
    try {
        let eventer = eventData.data.player;
        let entity = eventData.data.attacked_entity;
        const eventerName = system.getComponent(eventer, "minecraft:nameable").data;
        const eventerPos = system.getComponent(eventer, "minecraft:position").data;
        const entityPos = system.getComponent(entity, "minecraft:position").data;
        let x = Math.abs(eventerPos.x - entityPos.x);
        let y = Math.abs(eventerPos.y - entityPos.y);
        let z = Math.abs(eventerPos.z - entityPos.z);
        if (x > 4.5 || y > 4.5 || z > 4.5) {
            system.executeCommand(`testfor @a[name="${eventerName}",m=!1]`, (edata) => {
                if (edata.data.statusCode === 0) {
                    bdsx_1.bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§c§l${eventerName}님이 비정상 클라이언트로 인해 추방당했습니다"}]}`);
                    bdsx_1.bedrockServer.executeCommand(`kick "${eventerName}" 비정상 클라이언트(리치)로 인해 추방당했습니다`);
                }
            });
        }
    }
    catch (err) { }
    ;
});
const Nametest = new Map();
event_1.events.packetAfter(bdsx_1.PacketId.SetLocalPlayerAsInitialized).on((pkt, target) => {
    try {
        let name = connection_1.DataById(target)[0];
        Nametest.set(target, name);
        return;
    }
    catch (_a) { }
});
let i = setInterval(() => {
    Nametest.forEach((v, k) => {
        try {
            let Entity = k.getActor().getEntity();
            let Name = system.getComponent(Entity, "minecraft:nameable").data.name;
            if (v != Name)
                disconnect_1.Disconnect(k, '§c§l이름표 강제수정이 감지되었습니다!\n이름을 변경하시려면 xbox게이머 태그를 변경하세요!');
        }
        catch (_a) {
            Nametest.delete(k);
        }
    });
}, 10000);
event_1.events.serverStop.on(() => {
    clearInterval(i);
});
inventoryTransaction_1.InventoryTransaction.on((pkt, target, ev) => {
    if (ev.type === inventoryTransaction_1.transaction.TYPE_MISMATCH) {
        if (pkt[3] === 28 && pkt[8] === 99999) {
            setTimeout(() => { disconnect_1.Disconnect(target, '§c§l비정상 클라이언트가 감지되었습니다'); }, 100);
            return bdsx_1.CANCEL;
        }
    }
});
console.log(colors_1.yellow('*') + colors_1.white(' anticheat'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW50aWNoZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW50aWNoZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXVEO0FBQ3ZELHNDQUFvQztBQUNwQyxtQ0FBdUM7QUFDdkMsc0RBQWlEO0FBQ2pELHNEQUFtRDtBQUNuRCwwRUFBb0Y7QUFFcEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxrQ0FBa0MsRUFBRSxTQUFTLENBQUMsRUFBRTtJQUNsRSxJQUFJO1FBQ0EsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUUsQ0FBQyxJQUFJLENBQUM7UUFDN0UsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUUsQ0FBQyxJQUFJLENBQUM7UUFDNUUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUUsQ0FBQyxJQUFJLENBQUM7UUFDMUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENB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