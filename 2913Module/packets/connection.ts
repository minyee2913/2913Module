import { DeviceOS } from "bdsx/common";
import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetIds";
import { FormData } from "./form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export let playerList:string[] = [];
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
let nSt = new Map();
events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier) => {
    if (!(typeof ptr.connreq == "object")) {
        return;
    }
    const cert = ptr.connreq.cert
    const device = DeviceOS[ptr.connreq.getDeviceOS()];
    const xuid = cert.getXuid();
    const username = cert.getId();
    let [ip, port] = String(networkIdentifier).split('|');
    console.log(`${username} : ${ip} [${port}]`);
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
    nSt.set(networkIdentifier, device);
});
events.packetAfter(MinecraftPacketIds.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let playerName:string = NameById(target);
    setTimeout(()=>{
        if(!playerList.includes(playerName)) playerList.push(playerName);
    },100);
});
events.networkDisconnected.on(networkIdentifier => {
    setTimeout(()=>{
        const id = nMt.get(networkIdentifier);
        if (playerList.includes(id)) playerList.splice(playerList.indexOf(id),1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nSt.delete(networkIdentifier);
        nIt.delete(id);
        FormData.delete(networkIdentifier);
    }, 1000);
});
/**
  *get player DeviceOS by Id
*/
export function XuidByName(PlayerName: string) {
    let Rlt = nXt.get(PlayerName);
    if (Rlt === undefined) Rlt = '';
    return Rlt;
}
/**
  *get playerXuid by Name
*/
export function DeviceById(networkIdentifier: NetworkIdentifier):string{
    let Rlt:any = nSt.get(networkIdentifier);
    if (Rlt === undefined) Rlt = '';
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