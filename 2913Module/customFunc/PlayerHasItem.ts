import { bedrockServer } from "bdsx/launcher";
import { events } from "bdsx/event";

let system!:IVanillaServerSystem;
events.serverOpen.on(()=>{
    system = server.registerSystem(0,0);
});

if (bedrockServer.isLaunched()) system = server.registerSystem(0,0);

export function PlayerHasItem(entity:IEntity, itemId:string):number{
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container")!;
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container")!;
    if (playerInventory === null || playerHotbar === null) return 0;
    let ItemCount = 0;
    (playerInventory.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    (playerHotbar.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    return ItemCount
}

export function PlayerItems(entity:IEntity):string[]{
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container")!;
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container")!;
    let Arr:string[] = [];
    if (playerInventory === null || playerHotbar === null) return [];
    (playerInventory.data as IItemStack[]).forEach((v)=>{
        Arr.push(v.__identifier__);
    });
    (playerHotbar.data as IItemStack[]).forEach((v)=>{
        Arr.push(v.__identifier__);
    });
    return Arr
}