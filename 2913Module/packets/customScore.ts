import { NetworkIdentifier } from "bdsx";
import { RemoveObjectivePacket, SetDisplayObjectivePacket, SetScorePacket } from "bdsx/bds/packets";

export enum ScoreTYPE {
	TYPE_PLAYER = 1,
	TYPE_ENTITY = 2,
	TYPE_FAKE_PLAYER = 3
}
class ScoreEntry {

	public scoreboardId:number;
	public objectiveName:string;
	public score:number;
	public type:number;
	public entityUniqueId:number|null;
	public customName:string|null;
}
export namespace CustomScore{

	export function CreateSidebar(player:NetworkIdentifier, name:string, order:number) {
		const pkt = SetDisplayObjectivePacket.create();
        pkt.displaySlot = "sidebar";
        pkt.objectiveName = "2913:sidebar";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
	export function destroySidebar(player:NetworkIdentifier){
		const pkt = RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:sidebar";
		pkt.sendTo(player);
		pkt.dispose();
	}
    /**
     * @deprecated Not work yet
     */
    export function SetSidebarValue(player:NetworkIdentifier, Id:number, name:string, score:number) {
		const pkt = SetScorePacket.create();
		pkt.setCxxString('2913:sidebar', 0xA8);
		pkt.setInt32(ScoreTYPE.TYPE_FAKE_PLAYER, 0xA0);
		pkt.setInt32(score, 0x98);
		pkt.setInt32(Id, 0x88);
		pkt.setCxxString(name, 0x68);
		pkt.setInt32(0, 0x64);
		pkt.sendTo(player);
		pkt.dispose();
	}
	export function CreateList(player:NetworkIdentifier, name:string, order:number) {
		const pkt = SetDisplayObjectivePacket.create();
		pkt.displaySlot = "list";
        pkt.objectiveName = "2913:list";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
    export function destroyList(player:NetworkIdentifier){
		const pkt = RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:list";
		pkt.sendTo(player);
		pkt.dispose();
	}
}