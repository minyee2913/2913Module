import { BlockLegacy, BlockSource } from "bdsx/bds/block";
import { BlockPos } from "bdsx/bds/blockpos";
import { HashedString } from "bdsx/bds/hashedstring";
import { abstract } from "bdsx/common";
import { NativeClass } from "bdsx/nativeclass";
import { bool_t } from "bdsx/nativetype";
import { hacker } from "./hacker";
import { compoundTag } from "./nbt";


export class BlockActor extends NativeClass {
    save(tag: compoundTag):boolean{
        abstract();
    }
}

export class Blocksource extends BlockSource {
    getBlockEntity(blockPos:BlockPos): BlockActor | null {
        abstract();
    }
}


Blocksource.prototype.getBlockEntity = hacker.js("?getBlockEntity@BlockSource@@QEAAPEAVBlockActor@@AEBVBlockPos@@@Z", BlockActor, {this:Blocksource}, BlockPos);
BlockActor.prototype.save = hacker.js("BlockActor::save", bool_t, {this:BlockActor}, compoundTag);