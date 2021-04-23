"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerHasItem = void 0;
const event_1 = require("bdsx/event");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
function PlayerHasItem(entity, itemId) {
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container");
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container");
    let ItemCount = 0;
    playerInventory.data.forEach((v) => {
        if (v.__identifier__ === itemId)
            ItemCount = Math.round(ItemCount + v.count);
    });
    playerHotbar.data.forEach((v) => {
        if (v.__identifier__ === itemId)
            ItemCount = Math.round(ItemCount + v.count);
    });
    return ItemCount;
}
exports.PlayerHasItem = PlayerHasItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVySGFzSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBsYXllckhhc0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9DO0FBRXBDLElBQUksTUFBNEIsQ0FBQztBQUNqQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxNQUFhO0lBQ3ZELElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLCtCQUErQixDQUFFLENBQUM7SUFDcEYsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLENBQUUsQ0FBQztJQUM5RSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDakIsZUFBZSxDQUFDLElBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7UUFDaEQsSUFBSSxDQUFDLENBQUMsY0FBYyxLQUFLLE1BQU07WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0YsWUFBWSxDQUFDLElBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7UUFDN0MsSUFBSSxDQUFDLENBQUMsY0FBYyxLQUFLLE1BQU07WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUE7QUFDcEIsQ0FBQztBQVhELHNDQVdDIn0=