"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerHasItem = exports.transaction = exports.InventoryTransaction = exports.onServerState = exports.form = exports.numberFormat = exports.numberToKorean = exports.netCmd = exports.deleteBossBar = exports.setBossBar = exports.CustomScore = exports.DataById = exports.Disconnect = exports.playerList = exports.getScore = exports.playerPermission = exports.setHealth = exports.transferServer = exports.sendText = exports.NameById = exports.IdByName = exports.XuidByName = exports.Formsend = void 0;
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
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const fs_1 = require("fs");
const krevent_1 = require("krevent");
const system = server.registerSystem(0, 0);
let playerList = [];
exports.playerList = playerList;
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
event_1.events.packetAfter(bdsx_1.PacketId.Login).on((ptr, networkIdentifier) => {
    if (!(typeof ptr.connreq == "object")) {
        return;
    }
    const cert = ptr.connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
});
bdsx_1.nethook.after(bdsx_1.PacketId.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let actor = target.getActor();
    let playerName;
    playerName = NameById(target);
    setTimeout(() => {
        if (!playerList.includes(playerName))
            playerList.push(playerName);
    }, 100);
});
bdsx_1.NetworkIdentifier.close.on(networkIdentifier => {
    setTimeout(() => {
        const id = nMt.get(networkIdentifier);
        if (playerList.includes(id))
            playerList.splice(playerList.indexOf(id), 1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nIt.delete(id);
        FormData.delete(networkIdentifier);
    }, 100);
});
/**
  *get playerXuid by Name
*/
function XuidByName(PlayerName) {
    let Rlt = nXt.get(PlayerName);
    return Rlt;
}
exports.XuidByName = XuidByName;
/**
  *get playerName by Id
*/
function NameById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let playerName;
    try {
        let entity = actor.getEntity();
        playerName = system.getComponent(entity, "minecraft:nameable").data.name;
    }
    catch (_a) {
        playerName = nMt.get(networkIdentifier);
    }
    return playerName;
}
exports.NameById = NameById;
/**
  *get playerData by Id
  *result = [name,actor,entity, xuid]
*/
function DataById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let entity = actor.getEntity();
    let name = actor.getName();
    let xuid = nXt.get(name);
    return [name, actor, entity, xuid];
}
exports.DataById = DataById;
/**
  *get playerId by Name
*/
function IdByName(PlayerName) {
    let Rlt = nIt.get(PlayerName);
    return Rlt;
}
exports.IdByName = IdByName;
/////////////////////////////////////////
//JSform
let FormData = new Map();
class formJSONTYPE {
}
class formJSON {
    constructor() {
        this.type = "form";
        this.title = "";
        this.content = "";
        this.buttons = [];
    }
}
class CustomformJSON {
    constructor() {
        this.type = "custom_form";
        this.title = "";
        this.content = [];
    }
}
class modalJSON {
    constructor() {
        this.type = "modal";
        this.title = "";
        this.content = "";
        this.button1 = "";
        this.button2 = "";
    }
}
class FormFile {
    constructor() {
        this.json = new formJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    addButton(text, image) {
        return this.json.buttons.push({
            text: text,
            image: image
        });
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class CustomFormFile {
    constructor() {
        this.json = new CustomformJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    addContent(content) {
        this.json.content = content;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class ModalFile {
    constructor() {
        this.json = new modalJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    setButton1(button) {
        this.json.button1 = button;
    }
    setButton2(button) {
        this.json.button2 = button;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
form;
var form;
(function (form_1) {
    form_1.create = {
        form: (target) => {
            let form = new FormFile();
            form.target = target;
            return form;
        },
        custom_form: (target) => {
            let form = new CustomFormFile();
            form.target = target;
            return form;
        },
        modal: (target) => {
            let form = new ModalFile();
            form.target = target;
            return form;
        }
    };
    form_1.write = Formsend;
})(form || (form = {}));
exports.form = form;
/**
  *JsonType example : https://github.com/NLOGPlugins/Form_Json You can use form.write instead of this
*/
function Formsend(target, form, handler, id) {
    try {
        const modalPacket = packets_1.ShowModalFormPacket.create();
        let formId = Math.floor(Math.random() * 1147483647) + 1000000000;
        if (typeof id === "number")
            formId = id;
        modalPacket.setUint32(formId, 0x30);
        modalPacket.setCxxString(JSON.stringify(form), 0x38);
        modalPacket.sendTo(target, 0);
        if (handler === undefined)
            handler = () => { };
        if (!FormData.has(target)) {
            FormData.set(target, [
                {
                    Id: formId,
                    func: handler
                }
            ]);
        }
        else {
            let f = FormData.get(target);
            f.push({
                Id: formId,
                func: handler
            });
            FormData.set(target, f);
        }
        modalPacket.dispose();
    }
    catch (err) { }
}
exports.Formsend = Formsend;
event_1.events.packetRaw(bdsx_1.PacketId.ModalFormResponse).on((ptr, size, target) => {
    ptr.move(1);
    let formId = ptr.readVarUint();
    let formData = ptr.readVarString();
    let dataValue = FormData.get(target).find((v) => v.Id === formId);
    let data = JSON.parse(formData.replace("\n", ""));
    if (dataValue === undefined)
        return;
    dataValue.func(data);
    let f = FormData.get(target);
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
function sendText(target, text, type) {
    let networkIdentifier;
    if (target instanceof bdsx_1.NetworkIdentifier)
        networkIdentifier = target;
    else {
        networkIdentifier = IdByName(target);
    }
    if (type === undefined || typeof type !== "number")
        type = 0;
    const Packet = packets_1.TextPacket.create();
    Packet.message = text;
    Packet.setUint32(type, 0x30);
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}
exports.sendText = sendText;
/////////////////////////////////////////
//transferServer
function transferServer(networkIdentifier, address, port) {
    const Packet = packets_1.TransferPacket.create();
    Packet.address = address;
    Packet.port = port;
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}
exports.transferServer = transferServer;
/////////////////////////////////////////
//Health
function setHealth(networkIdentifier, value) {
    const HealthPacket = packets_1.SetHealthPacket.create();
    HealthPacket.setInt32(value, 0x30);
    HealthPacket.sendTo(networkIdentifier, 0);
    HealthPacket.dispose();
}
exports.setHealth = setHealth;
;
/////////////////////////////////////////
//Permission
function playerPermission(playerName, ResultEvent = (perm) => { }) {
    let xuid = nXt.get(playerName);
    var operJs;
    let permissions = '';
    try {
        operJs = JSON.parse(fs_1.readFileSync("permissions.json", "utf8"));
        let Js = operJs.find((v) => v.xuid === xuid);
        if (Js != undefined)
            permissions = Js.permission;
        if (Js === undefined)
            permissions = 'member';
    }
    catch (err) {
        permissions = 'member';
    }
    ResultEvent(permissions);
    return permissions;
}
exports.playerPermission = playerPermission;
;
/////////////////////////////////////////
//Score
function getScore(targetName, objectives, handler = (result) => { }) {
    system.executeCommand(`scoreboard players add @a[name="${targetName}",c=1] ${objectives} 0`, result => {
        // @ts-ignore
        let msgs = result.data.statusMessage;
        let msg = String(msgs).split('now');
        let a = String(msg[1]);
        let s = null;
        if (a.includes('-') === true)
            s = Number(a.replace(/[^0-9  ]/g, '')) - (Number(a.replace(/[^0-9  ]/g, '')) * 2);
        if (a.includes('-') === false)
            s = Number(a.replace(/[^0-9  ]/g, ''));
        handler(s);
    });
    return;
}
exports.getScore = getScore;
;
class ScoreTYPE {
    constructor() {
        this.TYPE_PLAYER = 1;
        this.TYPE_ENTITY = 2;
        this.TYPE_FAKE_PLAYER = 3;
    }
}
class ScoreEntry {
}
class scoreboard {
    CreateSidebar(player, name, order) {
        const pkt = packets_1.SetDisplayObjectivePacket.create();
        pkt.displaySlot = "sidebar";
        pkt.objectiveName = "2913:sidebar";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
        pkt.sendTo(player);
        pkt.dispose();
    }
    destroySidebar(player) {
        const pkt = packets_1.RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:sidebar";
        pkt.sendTo(player);
        pkt.dispose();
    }
    SetSidebarValue(player, Id, name, score) {
        const pkt = packets_1.SetScorePacket.create();
        pkt.setCxxString('2913:sidebar', 0xA8);
        pkt.setInt32(ScoreTYPE.prototype.TYPE_FAKE_PLAYER, 0xA0);
        pkt.setInt32(score, 0x98);
        pkt.setInt32(Id, 0x88);
        pkt.setCxxString(name, 0x68);
        pkt.setInt32(0, 0x64);
        pkt.sendTo(player);
        pkt.dispose();
    }
    CreateList(player, name, order) {
        const pkt = packets_1.SetDisplayObjectivePacket.create();
        pkt.displaySlot = "list";
        pkt.objectiveName = "2913:list";
        pkt.displayName = name;
        pkt.criteriaName = "dummy";
        pkt.sortOrder = order;
        pkt.sendTo(player);
        pkt.dispose();
    }
    destroyList(player) {
        const pkt = packets_1.RemoveObjectivePacket.create();
        pkt.objectiveName = "2913:list";
        pkt.sendTo(player);
        pkt.dispose();
    }
}
const CustomScore = new scoreboard();
exports.CustomScore = CustomScore;
/////////////////////////////////////////
//Disconnect
function Disconnect(networkidentifier, message) {
    const Packet = packets_1.DisconnectPacket.create();
    Packet.message = message;
    Packet.sendTo(networkidentifier, 0);
    Packet.dispose();
}
exports.Disconnect = Disconnect;
///////////////////////////////////////
//bossbar
function setBossBar(target, title, healthPercent) {
    let pk = packets_1.BossEventPacket.create();
    pk.setBin(target.getActor().getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(0, 0x40);
    pk.setCxxString(title, 0x48);
    pk.setFloat32(healthPercent, 0x68);
    pk.sendTo(target);
    pk.dispose();
}
exports.setBossBar = setBossBar;
function deleteBossBar(target) {
    let pk = packets_1.BossEventPacket.create();
    pk.setBin(target.getActor().getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(2, 0x40);
    pk.setCxxString("", 0x48);
    pk.setFloat32(0, 0x68);
    pk.sendTo(target);
    pk.dispose();
}
exports.deleteBossBar = deleteBossBar;
///////////////////////
event_1.events.packetBefore(bdsx_1.PacketId.CommandRequest).on((pkt, target) => {
    let data = DataById(target);
    let ev = {
        command: pkt.command,
        networkIdentifier: target,
        originActor: data[1],
        originEntity: data[2],
        originName: data[0],
        originXuid: data[3]
    };
    return netCmd.fire(ev);
});
const netCmd = new krevent_1.default();
exports.netCmd = netCmd;
function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.numberFormat = numberFormat;
function numberToKorean(number) {
    var inputNumber = number < 0 ? false : number;
    var unitWords = ['', '만', '억', '조', '경'];
    var splitUnit = 10000;
    var splitCount = unitWords.length;
    var resultArray = [];
    var resultString = '';
    for (var i = 0; i < splitCount; i++) {
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }
    for (var i = 0; i < resultArray.length; i++) {
        if (!resultArray[i])
            continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }
    if (number === 0)
        resultString = "0";
    return resultString;
}
exports.numberToKorean = numberToKorean;
//////////////////////////////////////////
////////////InventoryTransaction//////////
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
})(transaction || (transaction = {}));
exports.transaction = transaction;
event_1.events.packetRaw(bdsx_1.MinecraftPacketIds.InventoryTransaction).on((pkt, size, target) => {
    try {
        target.getActor().hasTag("move");
        let Arr = [];
        for (let i = 0; i <= size; i++) {
            try {
                Arr.push(pkt.readVarUint());
            }
            catch (_a) {
                Arr.push("crashed");
            }
        }
        return InventoryTransaction.fire(Arr, target, { type: Arr[2], action: Arr[4] });
    }
    catch (_b) {
        return;
    }
});
const InventoryTransaction = new krevent_1.default();
exports.InventoryTransaction = InventoryTransaction;
//////////////////////////////
///////////on sneak
let query = system.registerQuery();
bdsx_1.command.register("server_", "Server state with 2913MODULE").overload(state, {});
bdsx_1.command.register("state_", "Server state with 2913MODULE").overload(state, {});
class StateEvent {
    constructor(entity, log) {
        this.entity = entity;
        this.log = log;
    }
}
function state(p, origin, output) {
    let players = `${playerList.length} / ${bdsx_1.serverInstance.getMaxPlayers()} player`;
    let ent = system.getEntitiesFromQuery(query);
    let entities = `${ent.length + 0} entities`;
    if (typeof ent === "object") {
        ent = ent.filter((v) => typeof v !== "undefined");
        if (ent.length >= 1)
            `${ent.length} entities`;
    }
    let sId = `Server SessionId: ${bdsx_1.bedrockServer.sessionId}`;
    let motd = `Server Motd: ${bdsx_1.serverInstance.getMotd()}`;
    let l = `${players}\n${entities}\n${sId}\n${motd}`;
    function log(string) {
        if (!origin.isServerCommandOrigin())
            sendText(origin.getName(), string);
        else
            console.log(string);
    }
    log(l);
    const event = new StateEvent(origin, log);
    onServerState.fire(event);
    return output;
}
const onServerState = new krevent_1.default();
exports.onServerState = onServerState;
function PlayerHasItem(entity, itemId) {
    let playerInventory = system.getComponent(entity, MinecraftComponent.InventoryContainer);
    let playerHotbar = system.getComponent(entity, MinecraftComponent.HotbarContainer);
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
console.log(colors_1.red('2913MODULE LOADED'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjkxM01vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIjI5MTNNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsRUFBRTtBQUNGLCtKQUErSjtBQUMvSixnS0FBZ0s7QUFDaEssZ0tBQWdLO0FBQ2hLLGdLQUFnSztBQUNoSyxnS0FBZ0s7QUFDaEssZ0tBQWdLO0FBQ2hLLGdLQUFnSztBQUNoSyxFQUFFO0FBQ0YsRUFBRTtBQUNGLCtCQUE0SjtBQUc1Siw4Q0FBK1E7QUFJL1Esc0NBQW9DO0FBSXBDLG1DQUE2QjtBQUM3QiwyQkFBdUQ7QUFDdkQscUNBQTRCO0FBQzVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTFDLElBQUksVUFBVSxHQUFZLEVBQUUsQ0FBQztBQTZqQnpCLGdDQUFVO0FBNWpCZCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNwQixjQUFNLENBQUMsV0FBVyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsRUFBRTtJQUM3RCxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLEVBQUU7UUFDbkMsT0FBTztLQUNWO0lBQ0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FB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