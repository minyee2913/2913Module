import { Actor, CANCEL, NetworkIdentifier, PacketId } from "bdsx";
import { events } from "bdsx/event";
import Event from "krevent";
import { DataById } from "./connection";

events.packetBefore(PacketId.CommandRequest).on((pkt, target)=>{
    let data = DataById(target);
    let ev = {
        command: pkt.command,
        networkIdentifier: target,
        originActor: data[1],
        originEntity: data[2],
        originName: data[0],
        originXuid: data[3]
    }
    return netCmd.fire(ev);
})

export const netCmd = new Event<(ev:{command: string;networkIdentifier: NetworkIdentifier;originActor: Actor;originEntity: IEntity;originName: string;originXuid: string;}) => void|CANCEL>();