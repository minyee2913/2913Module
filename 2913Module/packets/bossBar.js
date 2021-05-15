"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bossBar = void 0;
const packets_1 = require("bdsx/bds/packets");
var bossBar;
(function (bossBar) {
    /**
     * @deprecated Not work yet
     */
    function set(target, title, healthPercent) {
        let pk = packets_1.BossEventPacket.create();
        pk.entityUniqueId = target.getActor().getUniqueIdPointer().getBin64();
        pk.type = 0;
        pk.title = title;
        pk.healthPercent = healthPercent;
        // pk.setBin(target.getActor()!.getUniqueIdPointer().getBin64(), 0x30);
        // pk.setUint32(0, 0x40);
        // pk.setCxxString(title, 0x48);
        // pk.setFloat32(healthPercent, 0x68);
        pk.sendTo(target);
        pk.dispose();
    }
    bossBar.set = set;
    /**
     * @deprecated Not work yet
     */
    function delete_(target) {
        let pk = packets_1.BossEventPacket.create();
        pk.entityUniqueId = target.getActor().getUniqueIdPointer().getBin64();
        pk.type = 2;
        pk.title = "";
        pk.healthPercent = 0;
        pk.sendTo(target);
        pk.dispose();
    }
    bossBar.delete_ = delete_;
})(bossBar = exports.bossBar || (exports.bossBar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9zc0Jhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQW1EO0FBRW5ELElBQWlCLE9BQU8sQ0E2QnZCO0FBN0JELFdBQWlCLE9BQU87SUFDcEI7O09BRUc7SUFDSCxTQUFnQixHQUFHLENBQUMsTUFBeUIsRUFBRSxLQUFhLEVBQUUsYUFBcUI7UUFDL0UsSUFBSSxFQUFFLEdBQUcseUJBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDakIsRUFBRSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDakMsdUVBQXVFO1FBQ3ZFLHlCQUF5QjtRQUN6QixnQ0FBZ0M7UUFDaEMsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFaZSxXQUFHLE1BWWxCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLE9BQU8sQ0FBQyxNQUF5QjtRQUM3QyxJQUFJLEVBQUUsR0FBRyx5QkFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkUsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDWixFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFSZSxlQUFPLFVBUXRCLENBQUE7QUFDTCxDQUFDLEVBN0JnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUE2QnZCIn0=