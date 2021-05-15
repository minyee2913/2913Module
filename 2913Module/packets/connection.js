"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdByName = exports.DataById = exports.NameById = exports.XuidByName = exports.playerList = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const form_1 = require("./form");
exports.playerList = [];
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
event_1.events.packetAfter(bdsx_1.PacketId.Login).on((ptr, networkIdentifier) => {
    if (!(typeof ptr.connreq == "object")) {
        return;
    }
    const cert = ptr.connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    let [ip, port] = String(networkIdentifier).split('|');
    console.log(`${username} : ${ip} [${port}]`);
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
});
event_1.events.packetAfter(bdsx_1.PacketId.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let playerName = NameById(target);
    setTimeout(() => {
        if (!exports.playerList.includes(playerName))
            exports.playerList.push(playerName);
    }, 100);
});
event_1.events.networkDisconnected.on(networkIdentifier => {
    setTimeout(() => {
        const id = nMt.get(networkIdentifier);
        if (exports.playerList.includes(id))
            exports.playerList.splice(exports.playerList.indexOf(id), 1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nIt.delete(id);
        form_1.FormData.delete(networkIdentifier);
    }, 1000);
});
/**
  *get playerXuid by Name
*/
function XuidByName(PlayerName) {
    let Rlt = nXt.get(PlayerName);
    return Rlt;
}
exports.XuidByName = XuidByName;
/**
  *get playerName by Id
*/
function NameById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let playerName;
    try {
        playerName = actor.getName();
    }
    catch (_a) {
        playerName = nMt.get(networkIdentifier);
    }
    return playerName;
}
exports.NameById = NameById;
/**
  *get playerData by Id
  *result = [name,actor,entity, xuid]
*/
function DataById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let entity = actor.getEntity();
    let name = actor.getName();
    let xuid = nXt.get(name);
    return [name, actor, entity, xuid];
}
exports.DataById = DataById;
/**
  *get playerId by Name
*/
function IdByName(PlayerName) {
    let Rlt = nIt.get(PlayerName);
    return Rlt;
}
exports.IdByName = IdByName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQW1EO0FBQ25ELHNDQUFvQztBQUNwQyxpQ0FBa0M7QUFFdkIsUUFBQSxVQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGNBQU0sQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxFQUFFO0lBQzdELElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsRUFBRTtRQUNuQyxPQUFPO0tBQ1Y7SUFDRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLE1BQU0sRUFBRSxLQUFLLElBQUksR0FBRyxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsR0FBRyxD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