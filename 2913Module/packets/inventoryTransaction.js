"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransaction = exports.transaction = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const krevent_1 = require("krevent");
var transaction;
(function (transaction) {
    transaction[transaction["TYPE_NORMAL"] = 0] = "TYPE_NORMAL";
    transaction[transaction["TYPE_MISMATCH"] = 1] = "TYPE_MISMATCH";
    transaction[transaction["TYPE_USE_ITEM"] = 2] = "TYPE_USE_ITEM";
    transaction[transaction["TYPE_USE_ITEM_ON_ENTITY"] = 3] = "TYPE_USE_ITEM_ON_ENTITY";
    transaction[transaction["TYPE_RELEASE_ITEM"] = 4] = "TYPE_RELEASE_ITEM";
    transaction[transaction["ACTION_CLICKBLOCK_PLACE"] = 0] = "ACTION_CLICKBLOCK_PLACE";
    transaction[transaction["ACTION_CLICKAIR_USE"] = 1] = "ACTION_CLICKAIR_USE";
    transaction[transaction["ACTION_DESTROY"] = 2] = "ACTION_DESTROY";
})(transaction = exports.transaction || (exports.transaction = {}));
event_1.events.packetRaw(bdsx_1.MinecraftPacketIds.InventoryTransaction).on((pkt, size, target) => {
    try {
        let Arr = [];
        for (let i = 0; i <= size; i++) {
            try {
                Arr.push(pkt.readVarUint());
            }
            catch (_a) {
                Arr.push("crashed");
            }
        }
        return exports.InventoryTransaction.fire(Arr, target, { type: Arr[2], action: Arr[4] });
    }
    catch (_b) {
        return;
    }
});
exports.InventoryTransaction = new krevent_1.default();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5VHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnlUcmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBcUU7QUFDckUsc0NBQW9DO0FBQ3BDLHFDQUE0QjtBQUc1QixJQUFZLFdBVVg7QUFWRCxXQUFZLFdBQVc7SUFDbkIsMkRBQWUsQ0FBQTtJQUNsQiwrREFBaUIsQ0FBQTtJQUNqQiwrREFBaUIsQ0FBQTtJQUNqQixtRkFBMkIsQ0FBQTtJQUMzQix1RUFBcUIsQ0FBQTtJQUVsQixtRkFBMkIsQ0FBQTtJQUMzQiwyRUFBdUIsQ0FBQTtJQUN2QixpRUFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBVlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFVdEI7QUFFRCxjQUFNLENBQUMsU0FBUyxDQUFDLHlCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRTtJQUM5RSxJQUFJO1FBQ0EsSUFBSSxHQUFHLEdBQVMsRUFBRSxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDeEIsSUFBRztnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQy9CO1lBQUMsV0FBTTtnQkFDSixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0o7UUFDRCxPQUFPLDRCQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUMvRTtJQUFDLFdBQU07UUFBQyxPQUFNO0tBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFVSxRQUFBLG9CQUFvQixHQUFHLElBQUksaUJBQUssRUFBMEYsQ0FBQyJ9