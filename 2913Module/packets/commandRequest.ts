import { Actor } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { Event } from "bdsx/eventtarget";
import { DataById } from "./connection";

events.packetBefore(MinecraftPacketIds.CommandRequest).on((pkt, target)=>{
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