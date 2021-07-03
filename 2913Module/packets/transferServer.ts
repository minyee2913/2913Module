import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { TransferPacket } from "bdsx/bds/packets";

export function transferServer(networkIdentifier: NetworkIdentifier, address: string, port: number) {
    const Packet = TransferPacket.create();
    Packet.address = address;
    Packet.port = port;
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}