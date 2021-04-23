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
        pk.setBin(target.getActor().getUniqueIdPointer().getBin64(), 0x30);
        pk.setUint32(0, 0x40);
        pk.setCxxString(title, 0x48);
        pk.setFloat32(healthPercent, 0x68);
        pk.sendTo(target);
        pk.dispose();
    }
    bossBar.set = set;
    /**
     * @deprecated Not work yet
     */
    function delete_(target) {
        let pk = packets_1.BossEventPacket.create();
        pk.setBin(target.getActor().getUniqueIdPointer().getBin64(), 0x30);
        pk.setUint32(2, 0x40);
        pk.setCxxString("", 0x48);
        pk.setFloat32(0, 0x68);
        pk.sendTo(target);
        pk.dispose();
    }
    bossBar.delete_ = delete_;
})(bossBar = exports.bossBar || (exports.bossBar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9zc0Jhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQW1EO0FBRW5ELElBQWlCLE9BQU8sQ0F5QnZCO0FBekJELFdBQWlCLE9BQU87SUFDcEI7O09BRUc7SUFDSCxTQUFnQixHQUFHLENBQUMsTUFBeUIsRUFBRSxLQUFhLEVBQUUsYUFBcUI7UUFDL0UsSUFBSSxFQUFFLEdBQUcseUJBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFSZSxXQUFHLE1BUWxCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLE9BQU8sQ0FBQyxNQUF5QjtRQUM3QyxJQUFJLEVBQUUsR0FBRyx5QkFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQUNMLENBQUMsRUF6QmdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXlCdkIifQ==