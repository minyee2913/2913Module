"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bdsx_1 = require("bdsx");
const colors_1 = require("colors");
const index_1 = require("../index");
const packets_1 = require("../packets");
let system = server.registerSystem(0, 0);
let query = system.registerQuery();
bdsx_1.command.register("server_", "Server state with 2913MODULE").overload(state, {});
bdsx_1.command.register("state_", "Server state with 2913MODULE").overload(state, {});
function state(p, origin, output) {
    let players = `${packets_1.playerList.length} / ${bdsx_1.serverInstance.getMaxPlayers()} player`;
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
            packets_1.sendText(origin.getName(), string);
        else
            console.log(string);
    }
    log(l);
    const event = new index_1.StateEvent(origin, log);
    index_1.onServerState.fire(event);
    return output;
}
console.log(colors_1.yellow('*') + colors_1.white(' state'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE4RDtBQUc5RCxtQ0FBdUM7QUFDdkMsb0NBQXFEO0FBQ3JELHdDQUFrRDtBQUNsRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUV4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFFbkMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLGNBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLDhCQUE4QixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztBQUU5RSxTQUFTLEtBQUssQ0FBQyxDQUFRLEVBQUMsTUFBb0IsRUFBQyxNQUFvQjtJQUM3RCxJQUFJLE9BQU8sR0FBRyxHQUFHLG9CQUFVLENBQUMsTUFBTSxNQUFNLHFCQUFjLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQztJQUNoRixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzVDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sV0FBVyxDQUFDO0tBQ2pEO0lBQ0QsSUFBSSxHQUFHLEdBQUcscUJBQXFCLG9CQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekQsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLHFCQUFjLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUN0RCxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sS0FBSyxRQUFRLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ25ELFNBQVMsR0FBRyxDQUFDLE1BQWE7UUFDdEIsSUFBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTtZQUFFLGtCQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztZQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLGtCQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyJ9