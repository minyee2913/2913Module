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
import { bedrockServer } from 'bdsx';
import { CommandOrigin } from 'bdsx/bds/commandorigin';
import { events } from 'bdsx/event';
import { green, red } from 'colors';
import Event from 'krevent';
import { existsSync, mkdirSync } from 'fs';
import { playerPermission, getScore, StopRequested, PlayerHasItem, numberFormat, numberToKorean } from './customFunc';
import { DataById, NameById, IdByName, XuidByName, playerList, form, Formsend, sendText, transferServer, setHealth, CustomScore, ScoreTYPE, Disconnect, netCmd, bossBar, InventoryTransaction, transaction, showProfile } from './packets';


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
    InventoryTransaction,
    transaction,
    onServerState,
    StateEvent,
    StopRequested,
    PlayerHasItem,
    numberToKorean,
    numberFormat,
    showProfile
}

console.log(red('2913MODULE LOADED'));
console.log(green('Made by minyee2913'));

events.serverOpen.on(()=>{
    require('./add-ons');
});
if (bedrockServer.isLaunched()) require('./add-ons');