import { bedrockServer, command, serverInstance } from "bdsx";
import { CommandOutput } from "bdsx/bds/command";
import { CommandOrigin } from "bdsx/bds/commandorigin";
import { white, yellow } from "colors";
import { onServerState, StateEvent } from "../index";
import { playerList, sendText } from "../packets";
let system = server.registerSystem(0,0);

let query = system.registerQuery();

command.register("server_", "Server state with 2913MODULE").overload(state,{});
command.register("state_", "Server state with 2913MODULE").overload(state,{});

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
console.log(yellow('*') + white(' state'));