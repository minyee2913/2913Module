import { NetworkIdentifier } from "bdsx";
import { DisconnectPacket } from "bdsx/bds/packets";

export function Disconnect(networkidentifier: NetworkIdentifier, message: string) {
    const Packet = DisconnectPacket.create();
    Packet.message = message;
    Packet.sendTo(networkidentifier, 0);
    Packet.dispose();
}