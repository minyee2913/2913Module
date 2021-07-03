import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import Event from "krevent";


export enum transaction{
    TYPE_NORMAL = 0,
	TYPE_MISMATCH = 1,
	TYPE_USE_ITEM = 2,
	TYPE_USE_ITEM_ON_ENTITY = 3,
	TYPE_RELEASE_ITEM = 4,

    ACTION_CLICKBLOCK_PLACE = 0,
    ACTION_CLICKAIR_USE = 1,
    ACTION_DESTROY = 2
}

events.packetRaw(MinecraftPacketIds.InventoryTransaction).on((pkt, size, target)=>{
    try {
        let Arr:any[] = [];
        for(let i = 0; i<=size; i++){
            try{
                Arr.push(pkt.readVarUint());
            } catch {
                Arr.push("crashed");
            }
        }
        return InventoryTransaction.fire(Arr, target, {type:Arr[2], action:Arr[4]});
    } catch {return}
});

export const InventoryTransaction = new Event<(pkt: any[], target:NetworkIdentifier, ev:{type:number, action:number}) => void|CANCEL>();