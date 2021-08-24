import { BlockPos, RelativeFloat } from "bdsx/bds/blockpos";
import { command } from "bdsx/command";
import { abstract } from "bdsx/common";
import { bool_t, CxxString, int32_t, NativeType, void_t } from "bdsx/nativetype";
import { CommandPermissionLevel } from "../../../bdsx/bds/command";
import { BlockActor, Blocksource } from "./blocks";
import { hacker } from "./hacker";
import { compoundTag } from "./nbt";

class SignBlockActor extends BlockActor {
    setMessage(message:string):void {
        abstract();
    }
    save(tag: compoundTag):boolean {
        abstract();
    }
    _onUpdatePacket(tag: compoundTag, region:Blocksource):void {
        abstract();
    }
}

command.register('changesign', '표지판 글자를 바꿉니다', CommandPermissionLevel.Operator).overload(({x, y, z, message, IgnoreLighting},o)=>{
    let actor = o.getEntity()!;
    if (actor === null) return;
    const originPos = o.getBlockPosition();
    originPos.x = x.is_relative ? originPos.x + x.value : x.value;
    originPos.y = y.is_relative ? originPos.y + y.value : y.value;
    originPos.z = z.is_relative ? originPos.z + z.value : z.value;
    let sign = actor.getRegion().as(Blocksource).getBlockEntity(originPos)?.as(SignBlockActor);
    if (sign === undefined) return;
    const tag = compoundTag.create();
    tag.construct();
    sign.save(tag)
    tag.putString("Text", message.replace(/\+n/gi, '\n'));
    let Iglight = 1;
    if (IgnoreLighting !== undefined) Iglight = IgnoreLighting;
    tag.putByte("IgnoreLighting", Iglight);
    sign._onUpdatePacket(tag, actor.getRegion().as(Blocksource));
    tag.destruct();

},{
    x: RelativeFloat,
    y: RelativeFloat,
    z: RelativeFloat,
    message: CxxString,
    IgnoreLighting: [int32_t, true]
});

SignBlockActor.prototype._onUpdatePacket = hacker.js("SignBlockActor::_onUpdatePacket", void_t, {this:SignBlockActor}, compoundTag, Blocksource);
SignBlockActor.prototype.setMessage = hacker.js("SignBlockActor::setMessage", void_t, {this:SignBlockActor}, CxxString);
SignBlockActor.prototype.save = hacker.js("SignBlockActor::save", bool_t, {this:SignBlockActor}, compoundTag);