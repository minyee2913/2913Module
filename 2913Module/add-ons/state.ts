import { CommandOutput } from "bdsx/bds/command";
import { CommandOrigin } from "bdsx/bds/commandorigin";
import { serverInstance } from "bdsx/bds/server";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { white, yellow } from "colors";
console.log(yellow('*') + white(' state'));
import { onServerState, StateEvent } from "../index";
import { playerList, sendText } from "../packets";
let system = server.registerSystem(0,0);

let query = system.registerQuery();

command.register("server_", "Server state with 2913MODULE").overload(state,{});
command.register("state_", "Server state with 2913MODULE").overload(state,{});

function state(p:object,origin:CommandOrigin,output:CommandOutput){
    let enT = new Map<string, number>();
    let players = `${playerList.length} / ${serverInstance.getMaxPlayers()} player`;
    let ent = system.getEntitiesFromQuery(query);
    let entities = `${ent.length + 0} entities`;
    if (typeof ent === "object") {
        ent = ent.filter((v)=> typeof v !== "undefined");
        if (ent.length >= 1) `${ent.length} entities`;
        ent.forEach((v)=>{
            if (v !== null && v !== undefined) {
                let g = enT.get(v.__identifier__)
                if (g !== undefined) {
                    enT.set(v.__identifier__, g+1);
                } else {
                    enT.set(v.__identifier__, 1);
                }
            }
        })
    }
    let Entities:{}[] = [];
    enT.forEach((v, k)=>{
        Entities.push(`${k}: ${v}`);
    });
    let usage = process.memoryUsage();
    let Usage:string[] = []
    for (var i = 0; i < 4; i++) {
       Usage.push(`${Object.keys(usage)[i]}: ${Object.values(usage)[i]} bytes`)
    }
    let sId = `Server SessionId: ${bedrockServer.sessionId}`;
    let motd = `Server Motd: ${serverInstance.getMotd()}`;
    let l = `${players}\n${entities}\n${JSON.stringify(Entities, null, 4)}\n${sId}\n${motd}\n${Usage.join('\n')}\nNodeJs Ver: ${process.version}`;
    function log(string:string){
        if(!origin.isServerCommandOrigin()) sendText(origin.getName(), string);
        else console.log(string);
    }
    log(l);
    const event = new StateEvent(origin, log);
    onServerState.fire(event);
    return output;
}