"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProfile = exports.numberFormat = exports.numberToKorean = exports.PlayerHasItem = exports.StopRequested = exports.StateEvent = exports.onServerState = exports.transaction = exports.InventoryTransaction = exports.bossBar = exports.netCmd = exports.ScoreTYPE = exports.CustomScore = exports.setHealth = exports.transferServer = exports.sendText = exports.Formsend = exports.form = exports.XuidByName = exports.IdByName = exports.NameById = exports.Disconnect = exports.DataById = exports.getScore = exports.playerPermission = exports.playerList = void 0;
//
// _______        _______    __     _____     ______    ___      ___                                                      ________          ___      __________
// |      \      /      |   |__|    |    \    |    |    \  \    /  /    ___________     ___________       __________    _|        |__      /   |    |  ____    |
// |       \    /       |    __     |     \   |    |     \  \  /  /     |   _______|    |   _______|     |  ____    |   |           |     /_   |    |__|  |    |
// |        \__/        |   |  |    |      \  |    |      \  \/  /      |  |_______     |  |_______      |__|   /   |   |_          |       |  |       ___|    |
// |     |\      /|     |   |  |    |   |\  \ |    |       |    |       |   _______|    |   _______|           /   /      |______   |       |  |     _|___     |
// |     | \____/ |     |   |  |    |   | \  \|    |       |    |       |  |_______     |  |_______       ____/   /__            |  |    ___|  |__  |  |__|    |
// |_____|        |_____|   |__|    |___|  \_______|       |____|       |__________|    |__________|     |___________|           |__|   |_________| |__________|
//
//
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const krevent_1 = require("krevent");
const fs_1 = require("fs");
const customFunc_1 = require("./customFunc");
Object.defineProperty(exports, "playerPermission", { enumerable: true, get: function () { return customFunc_1.playerPermission; } });
Object.defineProperty(exports, "getScore", { enumerable: true, get: function () { return customFunc_1.getScore; } });
Object.defineProperty(exports, "StopRequested", { enumerable: true, get: function () { return customFunc_1.StopRequested; } });
Object.defineProperty(exports, "PlayerHasItem", { enumerable: true, get: function () { return customFunc_1.PlayerHasItem; } });
Object.defineProperty(exports, "numberFormat", { enumerable: true, get: function () { return customFunc_1.numberFormat; } });
Object.defineProperty(exports, "numberToKorean", { enumerable: true, get: function () { return customFunc_1.numberToKorean; } });
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
Object.defineProperty(exports, "showProfile", { enumerable: true, get: function () { return packets_1.showProfile; } });
class StateEvent {
    constructor(entity, log) {
        this.entity = entity;
        this.log = log;
    }
}
exports.StateEvent = StateEvent;
let folder = fs_1.existsSync(`../scriptData`);
if (folder === false)
    fs_1.mkdirSync(`../scriptData`);
const onServerState = new krevent_1.default();
exports.onServerState = onServerState;
console.log(colors_1.red('2913MODULE LOADED'));
console.log(colors_1.green('Made by minyee2913'));
event_1.events.serverOpen.on(() => {
    require('./add-ons');
});
if (bdsx_1.bedrockServer.isLaunched())
    require('./add-ons');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxFQUFFO0FBQ0YsK0pBQStKO0FBQy9KLGdLQUFnSztBQUNoSyxnS0FBZ0s7QUFDaEssZ0tBQWdLO0FBQ2hLLGdLQUFnSztBQUNoSyxnS0FBZ0s7QUFDaEssZ0tBQWdLO0FBQ2hLLEVBQUU7QUFDRixFQUFFO0FBQ0YsK0JBQXFDO0FBRXJDLHNDQUFvQztBQUNwQyxtQ0FBb0M7QUFDcEMscUNBQTRCO0FBQzVCLDJCQUEyQztBQUMzQyw2Q0FBc0g7QUFzQmxILGlHQXRCSyw2QkFBZ0IsT0FzQkw7QUFDaEIseUZBdkJ1QixxQkFBUSxPQXVCdkI7QUFtQlIsOEZBMUNpQywwQkFBYSxPQTBDakM7QUFDYiw4RkEzQ2dELDBCQUFhLE9BMkNoRDtBQUViLDZGQTdDK0QseUJBQVksT0E2Qy9EO0FBRFosK0ZBNUM2RSwyQkFBYyxPQTRDN0U7QUEzQ2xCLHVDQUEyTztBQXVCdk8seUZBdkJLLGtCQUFRLE9BdUJMO0FBRVIseUZBekJlLGtCQUFRLE9BeUJmO0FBQ1IseUZBMUJ5QixrQkFBUSxPQTBCekI7QUFDUiwyRkEzQm1DLG9CQUFVLE9BMkJuQztBQVBWLDJGQXBCK0Msb0JBQVUsT0FvQi9DO0FBUVYscUZBNUIyRCxjQUFJLE9BNEIzRDtBQUNKLHlGQTdCaUUsa0JBQVEsT0E2QmpFO0FBQ1IseUZBOUIyRSxrQkFBUSxPQThCM0U7QUFDUiwrRkEvQnFGLHdCQUFjLE9BK0JyRjtBQUNkLDBGQWhDcUcsbUJBQVMsT0FnQ3JHO0FBQ1QsNEZBakNnSCxxQkFBVyxPQWlDaEg7QUFDWCwwRkFsQzZILG1CQUFTLE9Ba0M3SDtBQVZULDJGQXhCd0ksb0JBQVUsT0F3QnhJO0FBV1YsdUZBbkNvSixnQkFBTSxPQW1DcEo7QUFDTix3RkFwQzRKLGlCQUFPLE9Bb0M1SjtBQUNQLHFHQXJDcUssOEJBQW9CLE9BcUNySztBQUNwQiw0RkF0QzJMLHFCQUFXLE9Bc0MzTDtBQU9YLDRGQTdDd00scUJBQVcsT0E2Q3hNO0FBdENmLE1BQU0sVUFBVTtJQUNaLFlBQ1csTUFBcUIsRUFDckIsR0FBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVyQyxDQUFDO0NBQ0o7QUEyQkcsZ0NBQVU7QUExQmQsSUFBSSxNQUFNLEdBQUcsZUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLElBQUksTUFBTSxLQUFLLEtBQUs7SUFBRSxjQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakQsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBSyxFQUErQixDQUFDO0FBc0IzRCxzQ0FBYTtBQVNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0FBRXpDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUUsRUFBRTtJQUNyQixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDSCxJQUFJLG9CQUFhLENBQUMsVUFBVSxFQUFFO0lBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDIn0=