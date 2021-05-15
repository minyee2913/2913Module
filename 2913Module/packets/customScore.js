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
const SideEntries = new Map();
const ListEntries = new Map();
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
    function SetSidebarValue(player, Id, name, score, objective) {
        let actor = player.getActor();
        if (actor === null)
            throw '[SetSidebarValue] actor is Null';
        const entry = new packets_1.ScorePacketInfo(true);
        entry.construct();
        entry.scoreboardId.idAsNumber = Id;
        entry.objectiveName = objective;
        entry.customName = name;
        entry.type = packets_1.ScorePacketInfo.Type.FAKE_PLAYER;
        entry.score = score;
        if (objective === "2913:sidebar")
            SideEntries.set(Id, entry);
        if (objective === "2913:list")
            ListEntries.set(Id, entry);
        const packet = packets_1.SetScorePacket.create();
        packet.type = packets_1.SetScorePacket.Type.CHANGE;
        packet.entries.push(entry);
        packet.sendTo(actor.networkIdentifier);
        packet.dispose();
    }
    CustomScore.SetSidebarValue = SetSidebarValue;
    function RemoveSidebarValue(player, Id, objective) {
        let actor = player.getActor();
        if (actor === null)
            throw '[RemoveSidebarValue] actor is Null';
        let entry = undefined;
        if (objective === "2913:sidebar")
            entry = SideEntries.get(Id);
        if (objective === "2913:list")
            entry = ListEntries.get(Id);
        if (entry === undefined)
            throw '[RemoveSidebarValue] Not data saved in this Id';
        const packet = packets_1.SetScorePacket.create();
        packet.type = packets_1.SetScorePacket.Type.REMOVE;
        packet.entries.push(entry);
        packet.sendTo(actor.networkIdentifier);
        packet.dispose();
        if (objective === "2913:sidebar")
            SideEntries.delete(Id);
        if (objective === "2913:list")
            ListEntries.delete(Id);
    }
    CustomScore.RemoveSidebarValue = RemoveSidebarValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tU2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21TY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBcUg7QUFFckgsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ3BCLHVEQUFlLENBQUE7SUFDZix1REFBZSxDQUFBO0lBQ2YsaUVBQW9CLENBQUE7QUFDckIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7QUFDdkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7QUFDdkQsSUFBaUIsV0FBVyxDQW9FM0I7QUFwRUQsV0FBaUIsV0FBVztJQUUzQixTQUFnQixhQUFhLENBQUMsTUFBeUIsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUNuRixNQUFNLEdBQUcsR0FBRyxtQ0FBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQyxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM1QixHQUFHLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixHQUFHLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUMzQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFUZSx5QkFBYSxnQkFTNUIsQ0FBQTtJQUNELFNBQWdCLGNBQWMsQ0FBQyxNQUF5QjtRQUN2RCxNQUFNLEdBQUcsR0FBRywrQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQyxHQUFHLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FB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