"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.netCmd = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("bdsx/event");
const krevent_1 = require("krevent");
const connection_1 = require("./connection");
event_1.events.packetBefore(bdsx_1.PacketId.CommandRequest).on((pkt, target) => {
    let data = connection_1.DataById(target);
    let ev = {
        command: pkt.command,
        networkIdentifier: target,
        originActor: data[1],
        originEntity: data[2],
        originName: data[0],
        originXuid: data[3]
    };
    return exports.netCmd.fire(ev);
});
exports.netCmd = new krevent_1.default();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBa0U7QUFDbEUsc0NBQW9DO0FBQ3BDLHFDQUE0QjtBQUM1Qiw2Q0FBd0M7QUFFeEMsY0FBTSxDQUFDLFlBQVksQ0FBQyxlQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxFQUFFO0lBQzNELElBQUksSUFBSSxHQUFHLHFCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsSUFBSSxFQUFFLEdBQUc7UUFDTCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87UUFDcEIsaUJBQWlCLEVBQUUsTUFBTTtRQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0QixDQUFBO0lBQ0QsT0FBTyxjQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFBO0FBRVcsUUFBQSxNQUFNLEdBQUcsSUFBSSxpQkFBSyxFQUE4SixDQUFDIn0=