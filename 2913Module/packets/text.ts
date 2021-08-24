import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { TextPacket } from "bdsx/bds/packets";
import { serverInstance } from "../../../bdsx/bds/server";
import { IdByName } from "./connection";

/**
 * NAME or NETWORKIDENTIFIER
 *
 *Type Code :
 * Raw === 0,
 * Chat === 1,
 * Translation === 2,
 * Popup === 3,
 * Jukeboxpopup === 4,
 * Tip === 5,
 * system === 6,
 * Whisper === 7,
 * Announcement === 8,
 * Json === 9,
*/
export function sendText(target: NetworkIdentifier|string, text: string, type?: number) {
    let networkIdentifier:NetworkIdentifier;
    if (target instanceof NetworkIdentifier) networkIdentifier = target;
    else {
        let id = IdByName(target);
        if (id instanceof NetworkIdentifier) networkIdentifier = id;
    }
    if ( type === undefined || typeof type !== "number") type = 0;
    const Packet = TextPacket.create();
    Packet.message = text;
    Packet.setUint32(type, 0x30);
    Packet.sendTo(networkIdentifier!, 0);
    Packet.dispose();
}

export function sendTextAll(text: string, type?: number){
    const level = serverInstance.minecraft.getLevel();
    if (level === undefined || level === null) return;
    level.players.toArray().forEach((v)=>{
        sendText(v.getNetworkIdentifier(), text, type);
    });
};