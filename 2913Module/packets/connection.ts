import { NetworkIdentifier, PacketId } from "bdsx";
import { events } from "bdsx/event";
import { FormData } from "./form";

export let playerList:string[] = [];
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
events.packetAfter(PacketId.Login).on((ptr, networkIdentifier) => {
    if (!(typeof ptr.connreq == "object")) {
        return;
    }
    const cert = ptr.connreq.cert
    const xuid = cert.getXuid();
    const username = cert.getId();
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
});
events.packetAfter(PacketId.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let actor = target.getActor();
    let playerName:string;
    playerName = NameById(target);
    setTimeout(()=>{
        if(!playerList.includes(playerName)) playerList.push(playerName);
    },100);
});
NetworkIdentifier.close.on(networkIdentifier => {
    setTimeout(()=>{
        const id = nMt.get(networkIdentifier);
        if (playerList.includes(id)) playerList.splice(playerList.indexOf(id),1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nIt.delete(id);
        FormData.delete(networkIdentifier);
    }, 100);
});
/**
  *get playerXuid by Name
*/
export function XuidByName(PlayerName: string) {
    let Rlt:any = nXt.get(PlayerName);
    return Rlt;
}
/**
  *get playerName by Id
*/
export function NameById(networkIdentifier: NetworkIdentifier) {
    let actor = networkIdentifier.getActor();
    let playerName:string;
    try {
        playerName = actor!.getName();
    } catch {
        playerName = nMt.get(networkIdentifier);
    }
    return playerName;
}
/**
  *get playerData by Id
  *result = [name,actor,entity, xuid]
*/
export function DataById(networkIdentifier: NetworkIdentifier) {
    let actor = networkIdentifier.getActor();
    let entity = actor!.getEntity();
    let name = actor!.getName();
    let xuid = nXt.get(name);
    return [name, actor, entity, xuid];
}
/**
  *get playerId by Name
*/
export function IdByName(PlayerName: string) {
    let Rlt:NetworkIdentifier = nIt.get(PlayerName);
    return Rlt;
}