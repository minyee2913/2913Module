"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferServer = void 0;
const packets_1 = require("bdsx/bds/packets");
function transferServer(networkIdentifier, address, port) {
    const Packet = packets_1.TransferPacket.create();
    Packet.address = address;
    Packet.port = port;
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}
exports.transferServer = transferServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2ZlclNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBa0Q7QUFFbEQsU0FBZ0IsY0FBYyxDQUFDLGlCQUFvQyxFQUFFLE9BQWUsRUFBRSxJQUFZO0lBQzlGLE1BQU0sTUFBTSxHQUFHLHdCQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQU5ELHdDQU1DIn0=