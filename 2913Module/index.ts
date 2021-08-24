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
import { CommandOrigin } from 'bdsx/bds/commandorigin';
import { green, red } from 'colors';
import { Event } from "bdsx/eventtarget";
import './hooking';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { playerPermission, getScore, StopRequested, PlayerHasItem, numberFormat, numberToKorean, onUseItem, getScoreSync } from './customFunc';
import { DataById, NameById, IdByName, XuidByName, playerList, form, Formsend, sendText, transferServer, setHealth, CustomScore, ScoreTYPE, Disconnect, netCmd, bossBar, showProfile, DeviceById } from './packets';
import * as path from 'path';
import { bedrockServer } from 'bdsx/launcher';
import { events } from 'bdsx/event';

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
let folder = existsSync(`../scriptData`);
if (folder === false) mkdirSync(`../scriptData`);

const onServerState = new Event<(event: StateEvent) => void>();

const addons:string[] = [];
function loadAddon(){
    const files = readdirSync(path.dirname(__filename)+"/Addons");
    files.forEach((v)=>{
        if (v.endsWith('ts')) return;
        require(path.dirname(__filename)+"/Addons/"+v);
        addons.push(v);
    });
}

if (bedrockServer.isLaunched()) loadAddon();
else events.serverOpen.on(()=>{
    loadAddon();
});

export {
    playerList,
    playerPermission,
    getScore,
    DataById,
    Disconnect,
    NameById,
    IdByName,
    XuidByName,
    form,
    Formsend,
    sendText,
    transferServer,
    setHealth,
    CustomScore,
    ScoreTYPE,
    netCmd,
    bossBar,
    onServerState,
    StateEvent,
    StopRequested,
    PlayerHasItem,
    numberToKorean,
    numberFormat,
    showProfile,
    DeviceById,
    onUseItem,
    getScoreSync
}

console.log(red(`2913MODULE LOADED - ${addons.length} Addons`));
console.log(green('Made by minyee2913'));