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
import { PacketId, command, NetworkIdentifier, MinecraftPacketIds, Actor, nethook, ServerPlayer, NativePointer, serverInstance, bedrockServer } from "bdsx";
import { CommandOutput } from "bdsx/bds/command";
import { CommandOrigin } from "bdsx/bds/commandorigin";
import { BossEventPacket, ContainerOpenPacket, DisconnectPacket, ModalFormRequestPacket, RemoveObjectivePacket, ScriptCustomEventPacket, SetDisplayObjectivePacket, SetHealthPacket, SetScorePacket, ShowModalFormPacket, TextPacket, TransferPacket } from "bdsx/bds/packets";
import { BinaryStream } from "bdsx/bds/stream";
import { CANCEL, UNDNAME_NAME_ONLY } from "bdsx/common";
import { MultiThreadQueue, pdb } from "bdsx/core";
import { events } from "bdsx/event";
import { NativeClass } from "bdsx/nativeclass";
import { ProcHacker } from "bdsx/prochacker";
import { hex } from "bdsx/util";
import { red } from 'colors';
import { open, readFileSync, writeFileSync } from "fs";
import Event from "krevent";
const system = server.registerSystem(0,0);

let playerList:string[] = [];
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
events.packetAfter(PacketId.Login).on((ptr, networkIdentifier) => {
    if (!(typeof ptr.connreq == "object")) {
        return;
    }
    const cert = ptr.connreq.cert
    const xuid = cert.getXuid();
    const username = cert.getId();
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
});
nethook.after(PacketId.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let actor = target.getActor();
    let playerName:string;
    playerName = NameById(target);
    setTimeout(()=>{
        if(!playerList.includes(playerName)) playerList.push(playerName);
    },100);
});
NetworkIdentifier.close.on(networkIdentifier => {
    setTimeout(()=>{
        const id = nMt.get(networkIdentifier);
        if (playerList.includes(id)) playerList.splice(playerList.indexOf(id),1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nIt.delete(id);
        FormData.delete(networkIdentifier);
    }, 100);
});
/**
  *get playerXuid by Name
*/
function XuidByName(PlayerName: string) {
    let Rlt:any = nXt.get(PlayerName);
    return Rlt;
}
/**
  *get playerName by Id
*/
function NameById(networkIdentifier: NetworkIdentifier) {
    let actor = networkIdentifier.getActor();
    let playerName:string;
    try {
        let entity = actor!.getEntity();
        playerName = system.getComponent(entity, "minecraft:nameable")!.data.name;
    } catch {
        playerName = nMt.get(networkIdentifier);
    }
    return playerName;
}
/**
  *get playerData by Id
  *result = [name,actor,entity, xuid]
*/
function DataById(networkIdentifier: NetworkIdentifier) {
    let actor = networkIdentifier.getActor();
    let entity = actor!.getEntity();
    let name = actor!.getName();
    let xuid = nXt.get(name);
    return [name, actor, entity, xuid];
}
/**
  *get playerId by Name
*/
function IdByName(PlayerName: string) {
    let Rlt:NetworkIdentifier = nIt.get(PlayerName);
    return Rlt;
}

/////////////////////////////////////////
//JSform


let FormData = new Map<NetworkIdentifier, {Id:number;func:(data:any)=>void}[]>();
class formJSONTYPE {
    type:"form"|"custom_form"|"modal";
    title:string;
    content:string|any[];
    buttons?:{text:string; image?:any}[];
    button1?:string;
    button2?:string;
}

class formJSON {
    type:"form" = "form";
    title:string = "";
    content:string = "";
    buttons:{text:string; image?:any}[] = [];
}

class CustomformJSON {
    type:"custom_form" = "custom_form";
    title:string = "";
    content:any[] = [];
}

class modalJSON {
    type:"modal" = "modal";
    title:string = "";
    content:string = "";
    button1?:string = "";
    button2?:string = "";
}

class FormFile {
    json: formJSON = new formJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    setContent(content:string) {
        this.json.content = content;
    }
    addButton(text:string, image?:object) {
        return this.json.buttons.push({
            text: text,
            image: image
        });
    }
    addhandler(handler?:(data:number)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}
class CustomFormFile {
    json: CustomformJSON = new CustomformJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    addContent(content:object[]) {
        this.json.content = content;
    }
    addhandler(handler?:(data:any)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}

class ModalFile {
    json: modalJSON = new modalJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    setContent(content:string) {
        this.json.content = content;
    }
    setButton1(button:string) {
        this.json.button1 = button;
    }
    setButton2(button:string) {
        this.json.button2 = button;
    }
    addhandler(handler?:(data:boolean)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}

form


namespace form {
    export const create = {
        form:(target: NetworkIdentifier): FormFile => {
            let form = new FormFile();
            form.target = target;
            return form;
        },
        custom_form:(target: NetworkIdentifier): CustomFormFile => {
            let form = new CustomFormFile();
            form.target = target;
            return form;
        },
        modal:(target: NetworkIdentifier): ModalFile => {
            let form = new ModalFile();
            form.target = target;
            return form;
        }

    }

    export const write = Formsend;
}

/**
  *JsonType example : https://github.com/NLOGPlugins/Form_Json You can use form.write instead of this
*/
function Formsend(target: NetworkIdentifier, form: formJSONTYPE|object, handler?: (data: any) => void, id?:number) {
    try {
        const modalPacket = ShowModalFormPacket.create();
        let formId = Math.floor(Math.random() * 1147483647) + 1000000000;
        if (typeof id === "number") formId = id;
        modalPacket.setUint32(formId, 0x30);
        modalPacket.setCxxString(JSON.stringify(form), 0x38);
        modalPacket.sendTo(target, 0);
        if (handler === undefined) handler = ()=>{}
        if (!FormData.has(target)) {
            FormData.set(target, [
                {
                    Id: formId,
                    func: handler
                }
            ])
        } else {
            let f = FormData.get(target)!;
            f.push({
                Id: formId,
                func: handler
            })
            FormData.set(target, f);
        }
        modalPacket.dispose();
    } catch (err) {}
}
events.packetRaw(PacketId.ModalFormResponse).on((ptr, size, target) => {
    ptr.move(1);
    let formId = ptr.readVarUint();
    let formData = ptr.readVarString();
    let dataValue = FormData.get(target)!.find((v)=> v.Id === formId)!;
    let data = JSON.parse(formData.replace("\n",""));
    if (dataValue === undefined) return;
    dataValue.func(data);
    let f = FormData.get(target)!;
    f.splice(f.indexOf(dataValue), 1);
    FormData.set(target, f);
});

/////////////////////////////////////////
//TEXT
/**
 * NAME or NETWORKIDENTIFIER
 *
 *Type Code :
 * Raw === 0,
 * Chat === 1,
 * Translation === 2,
 * Popup === 3,
 * Jukeboxpopup === 4,
 * Tip === 5,
 * system === 6,
 * Whisper === 7,
 * Announcement === 8,
 * Json === 9,
*/
function sendText(target: NetworkIdentifier|string, text: string, type?: number) {
    let networkIdentifier:NetworkIdentifier;
    if (target instanceof NetworkIdentifier) networkIdentifier = target;
    else {
        networkIdentifier = IdByName(target);
    }
    if ( type === undefined || typeof type !== "number") type = 0;
    const Packet = TextPacket.create();
    Packet.message = text;
    Packet.setUint32(type, 0x30);
    Packet.sendTo(networkIdentifier!, 0);
    Packet.dispose();
}

/////////////////////////////////////////
//transferServer

function transferServer(networkIdentifier: NetworkIdentifier, address: string, port: number) {
    const Packet = TransferPacket.create();
    Packet.address = address;
    Packet.port = port;
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}

/////////////////////////////////////////
//Health

function setHealth(networkIdentifier: NetworkIdentifier, value: number) {
    const HealthPacket = SetHealthPacket.create();
    HealthPacket.setInt32(value, 0x30);
    HealthPacket.sendTo(networkIdentifier, 0);
    HealthPacket.dispose();
};

/////////////////////////////////////////
//Permission

function playerPermission(playerName: string, ResultEvent = (perm: any) => {}) {
    let xuid = nXt.get(playerName);
    var operJs:{permission:string, xuid:string}[];
    let permissions = '';
    try {
        operJs = JSON.parse(readFileSync("permissions.json", "utf8"));
        let Js = operJs.find((v)=> v.xuid === xuid);
        if (Js != undefined) permissions = Js.permission;
        if (Js === undefined) permissions = 'member';
    } catch(err) {
        permissions = 'member';
    }
    ResultEvent(permissions);
    return permissions;
};

/////////////////////////////////////////
//Score

function getScore(targetName: string, objectives: string, handler = (result: any) => {}) {
    system.executeCommand(`scoreboard players add @a[name="${targetName}",c=1] ${objectives} 0`, result => {
        // @ts-ignore
        let msgs = result.data.statusMessage;
        let msg = String(msgs).split('now');
        let a = String(msg[1]);
        let s = null;
        if (a.includes('-') === true) s = Number(a.replace(/[^0-9  ]/g, '')) - (Number(a.replace(/[^0-9  ]/g, '')) * 2);
        if (a.includes('-') === false) s = Number(a.replace(/[^0-9  ]/g, ''));
        handler(s);
    });
    return;
};

class ScoreTYPE {
	public TYPE_PLAYER = 1;
	public TYPE_ENTITY = 2;
	public TYPE_FAKE_PLAYER = 3;
}
class ScoreEntry {

	public scoreboardId:number;
	public objectiveName:string;
	public score:number;
	public type:number;
	public entityUniqueId:number|null;
	public customName:string|null;
}
class scoreboard{

	CreateSidebar(player:NetworkIdentifier, name:string, order:number) {
		const pkt = SetDisplayObjectivePacket.create();
        pkt.displaySlot = "sidebar";
        pkt.objectiveName = "2913:sidebar";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
	destroySidebar(player:NetworkIdentifier){
		const pkt = RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:sidebar";
		pkt.sendTo(player);
		pkt.dispose();
	}
	SetSidebarValue(player:NetworkIdentifier, Id:number, name:string, score:number) {
		const pkt = SetScorePacket.create();
		pkt.setCxxString('2913:sidebar', 0xA8);
		pkt.setInt32(ScoreTYPE.prototype.TYPE_FAKE_PLAYER, 0xA0);
		pkt.setInt32(score, 0x98);
		pkt.setInt32(Id, 0x88);
		pkt.setCxxString(name, 0x68);
		pkt.setInt32(0, 0x64);
		pkt.sendTo(player);
		pkt.dispose();
	}
	CreateList(player:NetworkIdentifier, name:string, order:number) {
		const pkt = SetDisplayObjectivePacket.create();
		pkt.displaySlot = "list";
        pkt.objectiveName = "2913:list";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
		pkt.sendTo(player);
		pkt.dispose();
	}
    destroyList(player:NetworkIdentifier){
		const pkt = RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:list";
		pkt.sendTo(player);
		pkt.dispose();
	}
}

const CustomScore = new scoreboard();

/////////////////////////////////////////
//Disconnect

function Disconnect(networkidentifier: NetworkIdentifier, message: string) {
    const Packet = DisconnectPacket.create();
    Packet.message = message;
    Packet.sendTo(networkidentifier, 0);
    Packet.dispose();
}

///////////////////////////////////////
//bossbar

function setBossBar(target: NetworkIdentifier, title: string, healthPercent: number): void {
    let pk = BossEventPacket.create();
    pk.setBin(target.getActor()!.getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(0, 0x40);
    pk.setCxxString(title, 0x48);
    pk.setFloat32(healthPercent, 0x68);
    pk.sendTo(target);
    pk.dispose();
}

function deleteBossBar(target: NetworkIdentifier): void {
    let pk = BossEventPacket.create();
    pk.setBin(target.getActor()!.getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(2, 0x40);
    pk.setCxxString("", 0x48);
    pk.setFloat32(0, 0x68);
    pk.sendTo(target);
    pk.dispose();
}

///////////////////////

events.packetBefore(PacketId.CommandRequest).on((pkt, target)=>{
    let data = DataById(target);
    let ev = {
        command: pkt.command,
        networkIdentifier: target,
        originActor: data[1],
        originEntity: data[2],
        originName: data[0],
        originXuid: data[3]
    }
    return netCmd.fire(ev);
})

const netCmd = new Event<(ev:{command: string;networkIdentifier: NetworkIdentifier;originActor: Actor;originEntity: IEntity;originName: string;originXuid: string;}) => void|CANCEL>();

function numberFormat(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function numberToKorean(number:number){
    var inputNumber:any  = number < 0 ? false : number;
    var unitWords    = ['', '만', '억', '조', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }
    if (number === 0) resultString = "0"

    return resultString;
}

//////////////////////////////////////////
////////////InventoryTransaction//////////


enum transaction{
    TYPE_NORMAL = 0,
	TYPE_MISMATCH = 1,
	TYPE_USE_ITEM = 2,
	TYPE_USE_ITEM_ON_ENTITY = 3,
	TYPE_RELEASE_ITEM = 4,

    ACTION_CLICKBLOCK_PLACE = 0,
    ACTION_CLICKAIR_USE = 1,
    ACTION_DESTROY = 2
}

events.packetRaw(MinecraftPacketIds.InventoryTransaction).on((pkt, size, target)=>{
    try {
        target.getActor()!.hasTag("move");
        let Arr:any[] = [];
        for(let i = 0; i<=size; i++){
            try{
                Arr.push(pkt.readVarUint());
            } catch {
                Arr.push("crashed");
            }
        }
        return InventoryTransaction.fire(Arr, target, {type:Arr[2], action:Arr[4]});
    } catch {return}
});

const InventoryTransaction = new Event<(pkt: any[], target:NetworkIdentifier, ev:{type:number, action:number}) => void|CANCEL>();

//////////////////////////////
///////////on sneak


let query = system.registerQuery();

command.register("server_", "Server state with 2913MODULE").overload(state,{});
command.register("state_", "Server state with 2913MODULE").overload(state,{});
interface stateEvent {
    entity: CommandOrigin,
    log: (string:string)=>void;
}
class StateEvent implements stateEvent {
    constructor(
        public entity: CommandOrigin,
        public log: (string:string)=>void
    ) {
    }
}
function state(p:object,origin:CommandOrigin,output:CommandOutput){
    let players = `${playerList.length} / ${serverInstance.getMaxPlayers()} player`;
    let ent = system.getEntitiesFromQuery(query);
    let entities = `${ent.length + 0} entities`;
    if (typeof ent === "object") {
        ent = ent.filter((v)=> typeof v !== "undefined");
        if (ent.length >= 1) `${ent.length} entities`;
    }
    let sId = `Server SessionId: ${bedrockServer.sessionId}`;
    let motd = `Server Motd: ${serverInstance.getMotd()}`;
    let l = `${players}\n${entities}\n${sId}\n${motd}`;
    function log(string:string){
        if(!origin.isServerCommandOrigin()) sendText(origin.getName(), string);
        else console.log(string);
    }
    log(l);
    const event = new StateEvent(origin, log);
    onServerState.fire(event);
    return output;
}
const onServerState = new Event<(event: StateEvent) => void>();

function PlayerHasItem(entity:IEntity, itemId:string):number{
    let playerInventory = system.getComponent(entity, MinecraftComponent.InventoryContainer)!;
    let playerHotbar = system.getComponent(entity, MinecraftComponent.HotbarContainer)!;
    let ItemCount = 0;
    (playerInventory.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    (playerHotbar.data as IItemStack[]).forEach((v)=>{
        if (v.__identifier__ === itemId) ItemCount = Math.round(ItemCount + v.count);
    });
    return ItemCount
}

console.log(red('2913MODULE LOADED'));
export {
    Formsend,
    XuidByName,
    IdByName,
    NameById,
    sendText,
    transferServer,
    setHealth,
    playerPermission,
    getScore,
    playerList,
    Disconnect,
    DataById,
    CustomScore,
    setBossBar,
    deleteBossBar,
    netCmd,
    numberToKorean,
    numberFormat,
    form,
    onServerState,
    InventoryTransaction,
    transaction,
    PlayerHasItem
};
