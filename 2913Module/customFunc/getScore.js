"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const event_1 = require("bdsx/event");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRTY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0M7QUFFcEMsSUFBSSxNQUE0QixDQUFDO0FBQ2pDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUUsRUFBRTtJQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFnQixRQUFRLENBQUMsVUFBa0IsRUFBRSxVQUFrQixFQUFFLFVBQVUsQ0FBQyxNQUFXLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDMUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQ0FBbUMsVUFBVSxVQUFVLFVBQVUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ2xHLGFBQWE7UUFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtZQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLO1lBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTztBQUNYLENBQUM7QUFaRCw0QkFZQztBQUFBLENBQUMifQ==