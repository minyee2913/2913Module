"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disconnect = void 0;
const packets_1 = require("bdsx/bds/packets");
function Disconnect(networkidentifier, message) {
    const Packet = packets_1.DisconnectPacket.create();
    Packet.message = message;
    Packet.sendTo(networkidentifier, 0);
    Packet.dispose();
}
exports.Disconnect = Disconnect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc2Nvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQW9EO0FBRXBELFNBQWdCLFVBQVUsQ0FBQyxpQkFBb0MsRUFBRSxPQUFlO0lBQzVFLE1BQU0sTUFBTSxHQUFHLDBCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFMRCxnQ0FLQyJ9