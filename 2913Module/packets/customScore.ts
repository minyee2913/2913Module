import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { RemoveObjectivePacket, ScorePacketInfo, SetDisplayObjectivePacket, SetScorePacket } from "bdsx/bds/packets";

export enum ScoreTYPE {
	TYPE_PLAYER = 1,
	TYPE_ENTITY = 2,
	TYPE_FAKE_PLAYER = 3
}

const SideEntries = new Map<number, ScorePacketInfo>();
const ListEntries = new Map<number, ScorePacketInfo>();
export namespace CustomScore {

	export function CreateSidebar(player: NetworkIdentifier, name: string, order: number) {
		const pkt = SetDisplayObjectivePacket.create();
		pkt.displaySlot = "sidebar";
		pkt.objectiveName = "2913:sidebar";
		pkt.displayName = name;
		pkt.criteriaName = "dummy";
		pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
	export function destroySidebar(player: NetworkIdentifier) {
		const pkt = RemoveObjectivePacket.create();
		pkt.objectiveName = "2913:sidebar";
		pkt.sendTo(player);
		pkt.dispose();
	}

	export function SetSidebarValue(player: NetworkIdentifier, Id: number, name: string, score: number, objective: "2913:sidebar" | "2913:list") {
		let actor = player.getActor();
		if (actor === null) throw '[SetSidebarValue] actor is Null';
		const entry = new ScorePacketInfo(true);
		entry.construct();
		entry.scoreboardId.idAsNumber = Id;
		entry.objectiveName = objective;
		entry.customName = name;
		entry.type = ScorePacketInfo.Type.FAKE_PLAYER;
		entry.score = score;
		if (objective === "2913:sidebar") SideEntries.set(Id, entry);
		if (objective === "2913:list") ListEntries.set(Id, entry);
		const packet = SetScorePacket.create();
		packet.type = SetScorePacket.Type.CHANGE;
		packet.entries.push(entry);
		packet.sendTo(player);
		packet.dispose();
	}
	export function SetPlayerValue(player: NetworkIdentifier, targetPlayer: NetworkIdentifier, score: number, objective: "2913:sidebar" | "2913:list") {
		let actor = player.getActor();
		if (actor === null) throw '[SetPlayerValue] actor is Null';
		let Tactor = targetPlayer.getActor();
		if (Tactor === null) throw '[SetPlayerValue] Target actor is Null';
		let Id = Math.random()*1000000 + 1000000;
		const entry = new ScorePacketInfo(true);
		entry.construct();
		entry.scoreboardId.idAsNumber = Id;
		entry.objectiveName = objective;
		entry.type = ScorePacketInfo.Type.PLAYER;
		entry.score = score;
		entry.playerEntityUniqueId = Tactor.getUniqueIdPointer().getBin64();
		if (objective === "2913:sidebar") SideEntries.set(Id, entry);
		if (objective === "2913:list") ListEntries.set(Id, entry);
		const packet = SetScorePacket.create();
		packet.type = SetScorePacket.Type.CHANGE;
		packet.entries.push(entry);
		packet.sendTo(player);
		packet.dispose();
	}
	export function RemoveSidebarValue(player: NetworkIdentifier, Id: number, objective: "2913:sidebar" | "2913:list") {
		let actor = player.getActor();
		if (actor === null) throw '[RemoveSidebarValue] actor is Null';
		let entry: ScorePacketInfo | undefined = undefined
		if (objective === "2913:sidebar") entry = SideEntries.get(Id);
		if (objective === "2913:list") entry = ListEntries.get(Id);
		if (entry === undefined) throw '[RemoveSidebarValue] Not data saved in this Id';
		const packet = SetScorePacket.create();
		packet.type = SetScorePacket.Type.REMOVE;
		packet.entries.push(entry);
		packet.sendTo(actor.networkIdentifier);
		packet.dispose();
		if (objective === "2913:sidebar") SideEntries.delete(Id);
		if (objective === "2913:list") ListEntries.delete(Id);
	}
	export function CreateList(player: NetworkIdentifier, name: string, order: number) {
		const pkt = SetDisplayObjectivePacket.create();
		pkt.displaySlot = "list";
		pkt.objectiveName = "2913:list";
		pkt.displayName = name;
		pkt.criteriaName = "dummy";
		pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
	export function destroyList(player: NetworkIdentifier) {
		const pkt = RemoveObjectivePacket.create();
		pkt.objectiveName = "2913:list";
		pkt.sendTo(player);
		pkt.dispose();
	}
}