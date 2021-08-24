import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { ComplexInventoryTransaction } from "bdsx/bds/inventory";
import { Disconnect, NameById, sendText, StopRequested } from "../index";
import { ActorFlags } from "bdsx/bds/actor";
import { GameType, ServerPlayer } from "bdsx/bds/player";
import { AbilitiesIndex } from "bdsx/bds/abilities";
import { serverInstance } from "../../../bdsx/bds/server";

// const system = server.registerSystem(0, 0);

function check(actor:ServerPlayer){
    const target = actor.getNetworkIdentifier();
    if (actor.getGameType() !== GameType.Creative && actor.getGameType() !== GameType.CreativeSpectator) {
        if (actor.getStatusFlag(ActorFlags.CanFly) || actor.abilities.getAbility(AbilitiesIndex.MayFly).value.boolVal) {
            Disconnect(target, '§e§l[2913module] §cDETECTED FLY HACK');
            return;
        }
        if (actor.abilities.getAbility(AbilitiesIndex.Instabuild).value.boolVal) {
            Disconnect(target, '§e§l[2913module] §cDETECTED InstaBuild HACK');
            return;
        }
    }
    if (actor.abilities.getAbility(AbilitiesIndex.NoClip).value.boolVal) {
        Disconnect(target, '§e§l[2913module] §cDETECTED NoClip HACK');
        return;
    }
}

events.packetBefore(MinecraftPacketIds.MovePlayer).on((pkt, target)=>{
    const actor = target.getActor()!;
    check(actor);
});

const i = setInterval(()=>{
    const level = serverInstance.minecraft.getLevel();
    if (level === null || level === undefined) return;
    level.players.toArray().forEach((v)=>{
        check(v);
    });
}, 3000);

events.packetRaw(MinecraftPacketIds.InventoryTransaction).on((pkt, size, target) => {
    try {
        let Arr:any[] = [];
        for(let i = 0; i<=size; i++){
            try{
                Arr.push(pkt.readVarUint());
            } catch {
                Arr.push("crashed");
            }
        }
        let type = Arr[2];

        if (type === ComplexInventoryTransaction.Type.InventoryMismatch) {
            if (Arr[3] === 28 && Arr[8] === 99999) {
                setTimeout(() => { Disconnect(target, '§e§l[2913module] §cDETECTED INVENTORY HACK'); }, 100);
                return CANCEL;
            }
        }
    } catch {return}
});

StopRequested.on(()=>{
    clearInterval(i);
});