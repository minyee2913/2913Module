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
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
});
event_1.events.packetAfter(bdsx_1.PacketId.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let actor = target.getActor();
    let playerName;
    playerName = NameById(target);
    setTimeout(() => {
        if (!exports.playerList.includes(playerName))
            exports.playerList.push(playerName);
    }, 100);
});
bdsx_1.NetworkIdentifier.close.on(networkIdentifier => {
    setTimeout(() => {
        const id = nMt.get(networkIdentifier);
        if (exports.playerList.includes(id))
            exports.playerList.splice(exports.playerList.indexOf(id), 1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nIt.delete(id);
        form_1.FormData.delete(networkIdentifier);
    }, 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQW1EO0FBQ25ELHNDQUFvQztBQUNwQyxpQ0FBa0M7QUFFdkIsUUFBQSxVQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGNBQU0sQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxFQUFFO0lBQzdELElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsRUFBRTtRQUNuQyxPQUFPO0tBQ1Y7SUFDRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3hFLElBQUksS0FBSyxHQUFH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