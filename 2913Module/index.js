"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateEvent = exports.onServerState = exports.transaction = exports.InventoryTransaction = exports.bossBar = exports.netCmd = exports.ScoreTYPE = exports.CustomScore = exports.setHealth = exports.transferServer = exports.sendText = exports.Formsend = exports.form = exports.XuidByName = exports.IdByName = exports.NameById = exports.Disconnect = exports.DataById = exports.getScore = exports.playerPermission = exports.playerList = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const krevent_1 = require("krevent");
const customFunc_1 = require("./customFunc");
Object.defineProperty(exports, "playerPermission", { enumerable: true, get: function () { return customFunc_1.playerPermission; } });
Object.defineProperty(exports, "getScore", { enumerable: true, get: function () { return customFunc_1.getScore; } });
const packets_1 = require("./packets");
Object.defineProperty(exports, "DataById", { enumerable: true, get: function () { return packets_1.DataById; } });
Object.defineProperty(exports, "NameById", { enumerable: true, get: function () { return packets_1.NameById; } });
Object.defineProperty(exports, "IdByName", { enumerable: true, get: function () { return packets_1.IdByName; } });
Object.defineProperty(exports, "XuidByName", { enumerable: true, get: function () { return packets_1.XuidByName; } });
Object.defineProperty(exports, "playerList", { enumerable: true, get: function () { return packets_1.playerList; } });
Object.defineProperty(exports, "form", { enumerable: true, get: function () { return packets_1.form; } });
Object.defineProperty(exports, "Formsend", { enumerable: true, get: function () { return packets_1.Formsend; } });
Object.defineProperty(exports, "sendText", { enumerable: true, get: function () { return packets_1.sendText; } });
Object.defineProperty(exports, "transferServer", { enumerable: true, get: function () { return packets_1.transferServer; } });
Object.defineProperty(exports, "setHealth", { enumerable: true, get: function () { return packets_1.setHealth; } });
Object.defineProperty(exports, "CustomScore", { enumerable: true, get: function () { return packets_1.CustomScore; } });
Object.defineProperty(exports, "ScoreTYPE", { enumerable: true, get: function () { return packets_1.ScoreTYPE; } });
Object.defineProperty(exports, "Disconnect", { enumerable: true, get: function () { return packets_1.Disconnect; } });
Object.defineProperty(exports, "netCmd", { enumerable: true, get: function () { return packets_1.netCmd; } });
Object.defineProperty(exports, "bossBar", { enumerable: true, get: function () { return packets_1.bossBar; } });
Object.defineProperty(exports, "InventoryTransaction", { enumerable: true, get: function () { return packets_1.InventoryTransaction; } });
Object.defineProperty(exports, "transaction", { enumerable: true, get: function () { return packets_1.transaction; } });
class StateEvent {
    constructor(entity, log) {
        this.entity = entity;
        this.log = log;
    }
}
exports.StateEvent = StateEvent;
const onServerState = new krevent_1.default();
exports.onServerState = onServerState;
console.log(colors_1.red('2913MODULE LOADED'));
console.log(colors_1.green('Made by minyee2913'));
event_1.events.serverOpen.on(() => {
    require('./add-ons');
});
if (bdsx_1.bedrockServer.isLaunched())
    require('./add-ons');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBcUM7QUFFckMsc0NBQW9DO0FBQ3BDLG1DQUFvQztBQUNwQyxxQ0FBNEI7QUFDNUIsNkNBQTBEO0FBb0J0RCxpR0FwQkssNkJBQWdCLE9Bb0JMO0FBQ2hCLHlGQXJCdUIscUJBQVEsT0FxQnZCO0FBcEJaLHVDQUE2TjtBQXFCek4seUZBckJLLGtCQUFRLE9BcUJMO0FBRVIseUZBdkJlLGtCQUFRLE9BdUJmO0FBQ1IseUZBeEJ5QixrQkFBUSxPQXdCekI7QUFDUiwyRkF6Qm1DLG9CQUFVLE9BeUJuQztBQVBWLDJGQWxCK0Msb0JBQVUsT0FrQi9DO0FBUVYscUZBMUIyRCxjQUFJLE9BMEIzRDtBQUNKLHlGQTNCaUUsa0JBQVEsT0EyQmpFO0FBQ1IseUZBNUIyRSxrQkFBUSxPQTRCM0U7QUFDUiwrRkE3QnFGLHdCQUFjLE9BNkJyRjtBQUNkLDBGQTlCcUcsbUJBQVMsT0E4QnJHO0FBQ1QsNEZBL0JnSCxxQkFBVyxPQStCaEg7QUFDWCwwRkFoQzZILG1CQUFTLE9BZ0M3SDtBQVZULDJGQXRCd0ksb0JBQVUsT0FzQnhJO0FBV1YsdUZBakNvSixnQkFBTSxPQWlDcEo7QUFDTix3RkFsQzRKLGlCQUFPLE9Ba0M1SjtBQUNQLHFHQW5DcUssOEJBQW9CLE9BbUNySztBQUNwQiw0RkFwQzJMLHFCQUFXLE9Bb0MzTDtBQTdCZixNQUFNLFVBQVU7SUFDWixZQUNXLE1BQXFCLEVBQ3JCLEdBQTBCO1FBRDFCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFFckMsQ0FBQztDQUNKO0FBeUJHLGdDQUFVO0FBdkJkLE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQUssRUFBK0IsQ0FBQztBQXNCM0Qsc0NBQWE7QUFJakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztBQUV6QyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxvQkFBYSxDQUFDLFVBQVUsRUFBRTtJQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyJ9