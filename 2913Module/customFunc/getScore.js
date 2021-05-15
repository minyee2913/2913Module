"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
if (bdsx_1.bedrockServer.isLaunched())
    system = server.registerSystem(0, 0);
function getScore(targetName, objectives, handler = (result) => { }) {
    system.executeCommand(`scoreboard players add @a[name="${targetName}",c=1] ${objectives} 0`, result => {
        // @ts-ignore
        let msgs = result.data.statusMessage;
        let msg = String(msgs).split('now');
        let a = String(msg[1]);
        let s = 0;
        if (a.includes('-') === true)
            s = Number(a.replace(/[^0-9  ]/g, '')) - (Number(a.replace(/[^0-9  ]/g, '')) * 2);
        if (a.includes('-') === false)
            s = Number(a.replace(/[^0-9  ]/g, ''));
        handler(s);
        msgs = null;
        msg = null;
        a = null;
    });
    return;
}
exports.getScore = getScore;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRTY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBcUM7QUFDckMsc0NBQW9DO0FBRXBDLElBQUksTUFBNEIsQ0FBQztBQUNqQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxvQkFBYSxDQUFDLFVBQVUsRUFBRTtJQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUVwRSxTQUFnQixRQUFRLENBQUMsVUFBa0IsRUFBRSxVQUFrQixFQUFFLFVBQVUsQ0FBQyxNQUFXLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDMUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQ0FBbUMsVUFBVSxVQUFVLFVBQVUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ2xHLGFBQWE7UUFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtZQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLO1lBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLElBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsR0FBVyxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXRCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTztBQUNYLENBQUM7QUFoQkQsNEJBZ0JDO0FBQUEsQ0FBQyJ9