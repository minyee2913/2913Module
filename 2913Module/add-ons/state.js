"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const colors_1 = require("colors");
console.log(colors_1.yellow('*') + colors_1.white(' state'));
const index_1 = require("../index");
const packets_1 = require("../packets");
let system = server.registerSystem(0, 0);
let query = system.registerQuery();
bdsx_1.command.register("server_", "Server state with 2913MODULE").overload(state, {});
bdsx_1.command.register("state_", "Server state with 2913MODULE").overload(state, {});
function state(p, origin, output) {
    let enT = new Map();
    let players = `${packets_1.playerList.length} / ${bdsx_1.serverInstance.getMaxPlayers()} player`;
    let ent = system.getEntitiesFromQuery(query);
    let entities = `${ent.length + 0} entities`;
    if (typeof ent === "object") {
        ent = ent.filter((v) => typeof v !== "undefined");
        if (ent.length >= 1)
            `${ent.length} entities`;
        ent.forEach((v) => {
            if (v !== null && v !== undefined) {
                let g = enT.get(v.__identifier__);
                if (g !== undefined) {
                    enT.set(v.__identifier__, g + 1);
                }
                else {
                    enT.set(v.__identifier__, 1);
                }
            }
        });
    }
    let Entities = [];
    enT.forEach((v, k) => {
        Entities.push(`${k}: ${v}`);
    });
    let usage = process.memoryUsage();
    let Usage = [];
    for (var i = 0; i < 4; i++) {
        Usage.push(`${Object.keys(usage)[i]}: ${Object.values(usage)[i]} bytes`);
    }
    let sId = `Server SessionId: ${bdsx_1.bedrockServer.sessionId}`;
    let motd = `Server Motd: ${bdsx_1.serverInstance.getMotd()}`;
    let l = `${players}\n${entities}\n${JSON.stringify(Entities, null, 4)}\n${sId}\n${motd}\n${Usage.join('\n')}\nNodeJs Ver: ${process.version}`;
    function log(string) {
        if (!origin.isServerCommandOrigin())
            packets_1.sendText(origin.getName(), string);
        else
            console.log(string);
    }
    log(l);
    const event = new index_1.StateEvent(origin, log);
    index_1.onServerState.fire(event);
    return output;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE4RDtBQUc5RCxtQ0FBdUM7QUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDM0Msb0NBQXFEO0FBQ3JELHdDQUFrRDtBQUNsRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUV4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFFbkMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLGNBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLDhCQUE4QixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztBQUU5RSxTQUFTLEtBQUssQ0FBQyxDQUFRLEVBQUMsTUFBb0IsRUFBQyxNQUFvQjtJQUM3RCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUNwQyxJQUFJLE9BQU8sR0FBRyxHQUFHLG9CQUFVLENBQUMsTUFBTSxNQUFNLHFCQUFjLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQztJQUNoRixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzVDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sV0FBVyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDakMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNqQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQTtLQUNMO0lBQ0QsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUU7UUFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLElBQUksS0FBSyxHQUFZLEVBQUUsQ0FBQTtJQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzFFO0lBQ0QsSUFBSSxHQUFHLEdBQUcscUJBQXFCLG9CQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekQsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLHFCQUFjLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUN0RCxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sS0FBSyxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5SSxTQUFTLEdBQUcsQ0FBQyxNQUFhO1FBQ3RCLElBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7WUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQzs7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxrQkFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=