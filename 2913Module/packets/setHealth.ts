import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { SetHealthPacket } from "bdsx/bds/packets";

export function setHealth(networkIdentifier: NetworkIdentifier, value: number) {
    const HealthPacket = SetHealthPacket.create();
    HealthPacket.setInt32(value, 0x30);
    HealthPacket.sendTo(networkIdentifier, 0);
    HealthPacket.dispose();
};