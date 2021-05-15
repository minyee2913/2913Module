import { NetworkIdentifier } from "bdsx";
import { BossEventPacket } from "bdsx/bds/packets";

export namespace bossBar {
    /**
     * @deprecated Not work yet
     */
    export function set(target: NetworkIdentifier, title: string, healthPercent: number): void {
        let pk = BossEventPacket.create();
        pk.entityUniqueId = target.getActor()!.getUniqueIdPointer().getBin64();
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
    /**
     * @deprecated Not work yet
     */
    export function delete_(target: NetworkIdentifier): void {
        let pk = BossEventPacket.create();
        pk.entityUniqueId = target.getActor()!.getUniqueIdPointer().getBin64();
        pk.type = 2;
        pk.title = "";
        pk.healthPercent = 0;
        pk.sendTo(target);
        pk.dispose();
    }
}