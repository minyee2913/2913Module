import { ItemStack } from "bdsx/bds/inventory";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import Event from "krevent";
import { InventoryTransaction, transaction } from "../packets";
let system!:IVanillaServerSystem;
events.serverOpen.on(()=>{
    system = server.registerSystem(0,0);
});
if (bedrockServer.isLaunched()) system = server.registerSystem(0,0);

let timeout = new Map<NetworkIdentifier, NodeJS.Timeout>();
InventoryTransaction.on((pkt, target, ev)=>{
    if ((ev.action === transaction.ACTION_CLICKAIR_USE || ev.action === transaction.ACTION_CLICKBLOCK_PLACE) && (ev.type === transaction.TYPE_USE_ITEM || ev.type === transaction.TYPE_USE_ITEM_ON_ENTITY)) {
        let actor = target.getActor();
        if (actor === null) return;
        let entity = actor.getEntity();
        let itemStack = actor.getMainhandSlot();
        let hand = system.getComponent(entity, "minecraft:hand_container");
        if (hand === null) return;
        let mainhand = (hand.data[0] as IItemStack).__identifier__;
        if (timeout.has(target)) {
            clearTimeout(timeout.get(target)!);
            timeout.set(target, setTimeout(()=>{
                timeout.delete(target);
            }, 300));
        }
        else {
            timeout.set(target, setTimeout(()=>{
                timeout.delete(target);
            }, 300));
            return onUseItem.fire(target, mainhand, itemStack);
        }
    };
});

export const onUseItem = new Event<(target:NetworkIdentifier, itemName:string, itemStack:ItemStack) => void | CANCEL>();