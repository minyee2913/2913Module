"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomScore = exports.ScoreTYPE = void 0;
const packets_1 = require("bdsx/bds/packets");
var ScoreTYPE;
(function (ScoreTYPE) {
    ScoreTYPE[ScoreTYPE["TYPE_PLAYER"] = 1] = "TYPE_PLAYER";
    ScoreTYPE[ScoreTYPE["TYPE_ENTITY"] = 2] = "TYPE_ENTITY";
    ScoreTYPE[ScoreTYPE["TYPE_FAKE_PLAYER"] = 3] = "TYPE_FAKE_PLAYER";
})(ScoreTYPE = exports.ScoreTYPE || (exports.ScoreTYPE = {}));
class ScoreEntry {
}
var CustomScore;
(function (CustomScore) {
    function CreateSidebar(player, name, order) {
        const pkt = packets_1.SetDisplayObjectivePacket.create();
        pkt.displaySlot = "sidebar";
        pkt.objectiveName = "2913:sidebar";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
        pkt.sendTo(player);
        pkt.dispose();
    }
    CustomScore.CreateSidebar = CreateSidebar;
    function destroySidebar(player) {
        const pkt = packets_1.RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:sidebar";
        pkt.sendTo(player);
        pkt.dispose();
    }
    CustomScore.destroySidebar = destroySidebar;
    /**
     * @deprecated Not work yet
     */
    function SetSidebarValue(player, Id, name, score) {
        const pkt = packets_1.SetScorePacket.create();
        pkt.setCxxString('2913:sidebar', 0xA8);
        pkt.setInt32(ScoreTYPE.TYPE_FAKE_PLAYER, 0xA0);
        pkt.setInt32(score, 0x98);
        pkt.setInt32(Id, 0x88);
        pkt.setCxxString(name, 0x68);
        pkt.setInt32(0, 0x64);
        pkt.sendTo(player);
        pkt.dispose();
    }
    CustomScore.SetSidebarValue = SetSidebarValue;
    function CreateList(player, name, order) {
        const pkt = packets_1.SetDisplayObjectivePacket.create();
        pkt.displaySlot = "list";
        pkt.objectiveName = "2913:list";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
        pkt.sendTo(player);
        pkt.dispose();
    }
    CustomScore.CreateList = CreateList;
    function destroyList(player) {
        const pkt = packets_1.RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:list";
        pkt.sendTo(player);
        pkt.dispose();
    }
    CustomScore.destroyList = destroyList;
})(CustomScore = exports.CustomScore || (exports.CustomScore = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tU2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21TY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBb0c7QUFFcEcsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ3BCLHVEQUFlLENBQUE7SUFDZix1REFBZSxDQUFBO0lBQ2YsaUVBQW9CLENBQUE7QUFDckIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBQ0QsTUFBTSxVQUFVO0NBUWY7QUFDRCxJQUFpQixXQUFXLENBZ0QzQjtBQWhERCxXQUFpQixXQUFXO0lBRTNCLFNBQWdCLGFBQWEsQ0FBQyxNQUF3QixFQUFFLElBQVcsRUFBRSxLQUFZO1FBQ2hGLE1BQU0sR0FBRyxHQUFHLG1DQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQVRlLHlCQUFhLGdCQVM1QixDQUFBO0lBQ0QsU0FBZ0IsY0FBYyxDQUFDLE1BQXdCO1FBQ3RELE1BQU0sR0FBRyxHQUFHLCtCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUxlLDBCQUFjLGlCQUs3QixDQUFBO0lBQ0U7O09BRUc7SUFDSCxTQUFnQixlQUFlLENBQUMsTUFBd0IsRUFBRSxFQUFTLEVBQUUsSUFBVyxFQUFFLEtBQVk7UUFDaEcsTUFBTSxHQUFHLEdBQUcsd0JBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFWa0IsMkJBQWUsa0JBVWpDLENBQUE7SUFDRCxTQUFnQixVQUFVLENBQUMsTUFBd0IsRUFBRSxJQUFXLEVBQUUsS0FBWTtRQUM3RSxNQUFNLEdBQUcsR0FBRyxtQ0FBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQyxHQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUNuQixHQUFHLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixHQUFHLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUMzQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFUZSxzQkFBVSxhQVN6QixDQUFBO0lBQ0UsU0FBZ0IsV0FBVyxDQUFDLE1BQXdCO1FBQ3RELE1BQU0sR0FBRyxHQUFHLCtCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUxrQix1QkFBVyxjQUs3QixDQUFBO0FBQ0YsQ0FBQyxFQWhEZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFnRDNCIn0=