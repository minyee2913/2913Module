import { events } from "bdsx/event";

let system!:IVanillaServerSystem;
events.serverOpen.on(()=>{
    system = server.registerSystem(0,0);
});

export function PlayerHasItem(entity:IEntity, itemId:string):number{
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container")!;
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container")!;
    let ItemCount = 0;
    (playerInventory.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    (playerHotbar.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    return ItemCount
}