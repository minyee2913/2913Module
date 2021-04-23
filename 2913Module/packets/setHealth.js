"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHealth = void 0;
const packets_1 = require("bdsx/bds/packets");
function setHealth(networkIdentifier, value) {
    const HealthPacket = packets_1.SetHealthPacket.create();
    HealthPacket.setInt32(value, 0x30);
    HealthPacket.sendTo(networkIdentifier, 0);
    HealthPacket.dispose();
}
exports.setHealth = setHealth;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0SGVhbHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0SGVhbHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUFtRDtBQUVuRCxTQUFnQixTQUFTLENBQUMsaUJBQW9DLEVBQUUsS0FBYTtJQUN6RSxNQUFNLFlBQVksR0FBRyx5QkFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLFlBQVksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFMRCw4QkFLQztBQUFBLENBQUMifQ==