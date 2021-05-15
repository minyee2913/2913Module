import { NetworkIdentifier } from "bdsx";
import { ShowProfilePacket } from "bdsx/bds/packets";

export function showProfile(target:NetworkIdentifier, xuid:string){
    const pkt = ShowProfilePacket.create();
    pkt.setCxxString(xuid, 0x30);
    pkt.sendTo(target);
    pkt.dispose();
}