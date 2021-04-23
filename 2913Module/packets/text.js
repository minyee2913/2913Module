"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendText = void 0;
const bdsx_1 = require("bdsx");
const packets_1 = require("bdsx/bds/packets");
const connection_1 = require("./connection");
/**
 * NAME or NETWORKIDENTIFIER
 *
 *Type Code :
 * Raw === 0,
 * Chat === 1,
 * Translation === 2,
 * Popup === 3,
 * Jukeboxpopup === 4,
 * Tip === 5,
 * system === 6,
 * Whisper === 7,
 * Announcement === 8,
 * Json === 9,
*/
function sendText(target, text, type) {
    let networkIdentifier;
    if (target instanceof bdsx_1.NetworkIdentifier)
        networkIdentifier = target;
    else {
        networkIdentifier = connection_1.IdByName(target);
    }
    if (type === undefined || typeof type !== "number")
        type = 0;
    const Packet = packets_1.TextPacket.create();
    Packet.message = text;
    Packet.setUint32(type, 0x30);
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}
exports.sendText = sendText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXlDO0FBQ3pDLDhDQUE4QztBQUM5Qyw2Q0FBd0M7QUFFeEM7Ozs7Ozs7Ozs7Ozs7O0VBY0U7QUFDRixTQUFnQixRQUFRLENBQUMsTUFBZ0MsRUFBRSxJQUFZLEVBQUUsSUFBYTtJQUNsRixJQUFJLGlCQUFtQyxDQUFDO0lBQ3hDLElBQUksTUFBTSxZQUFZLHdCQUFpQjtRQUFFLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztTQUMvRDtRQUNELGlCQUFpQixHQUFHLHFCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFLLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxDQUFDLENBQUM7SUFDOUQsTUFBTSxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBWkQsNEJBWUMifQ==