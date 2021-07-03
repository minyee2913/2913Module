import { Register } from "bdsx/assembler";
import { abstract } from "bdsx/common";
import { AllocatedPointer, chakraUtil, VoidPointer } from "bdsx/core";
import { makefunc } from "bdsx/makefunc";
import { makefuncDefines } from "bdsx/makefunc_defines";
import { NativeClass, nativeClass } from "bdsx/nativeclass";
import { bool_t, CxxString, float32_t, int16_t, int32_t, int64_as_float_t, int8_t, NativeType, uint64_as_float_t, uint8_t, void_t } from "bdsx/nativetype";
import { hacker } from "./hacker";

export const basic_string_span = new NativeType<string>(
    'basic_string_span<char_const_,-1>',
    0x10, 8,
    v=>typeof v === 'string',
    (ptr, offset)=>{
        const newptr = ptr.add(offset);
        const length = newptr.getInt64AsFloat();
        return newptr.getPointer(8).getString(length);
    },
    (ptr, v, offset)=>{
        const newptr = ptr.add(offset);
        newptr.setInt64WithFloat(v.length);
        const strObj = new AllocatedPointer(v.length);
        strObj.setString(v);
        newptr.setPointer(strObj, 8);
    },
    (asm, target, source, info)=>{
        asm.qmov_t_t(makefunc.Target[0], source);
        asm.lea_r_rp(Register.r9, Register.rbp, 1, info.offsetForLocalSpace!+0x10);
        asm.mov_r_c(Register.r8, chakraUtil.stack_utf8);
        asm.mov_r_c(Register.rdx, info.numberOnUsing);
        asm.call_rp(Register.rdi, 1, makefuncDefines.fn_str_js2np);

        asm.mov_r_rp(Register.rcx, Register.rbp, 1, info.offsetForLocalSpace!+0x10);
        asm.mov_rp_r(Register.rbp, 1, info.offsetForLocalSpace!+0x08, Register.rax);
        asm.mov_rp_r(Register.rbp, 1, info.offsetForLocalSpace!, Register.rcx);
        asm.lea_t_rp(target, Register.rbp, 1, info.offsetForLocalSpace!);
    },
    (asm, target, source, info)=>{
        throw new Error("np2js for gsl::basic_string_span is not supported");
        // TODO: implement np2js
        // currently no functions are in use that return basic_string_span so it is unnecessary
    },
    (asm, target, source)=>asm.qmov_t_t(target, source)
);
basic_string_span[makefunc.pointerReturn] = true;
Object.freeze(basic_string_span);
export type basic_string_span = string;


@nativeClass(null)
export class Tag extends NativeClass {}

export namespace Tag {
    export enum Type {
        EndTag,
        ByteTag,
        ShortTag,
        IntTag,
        Int64Tag,
        FloatTag,
        DoubleTag,
        ByteArrayTag,
        StringTag,
        ListTag,
        compoundTag,
        IntArrayTag
    }
}

@nativeClass(0x10)
export class compoundTag extends Tag {
    putInt(name: string, val:number): number {
        abstract();
    }
    getInt(name: string): number {
        abstract();
    }
    get(name: string): Tag | null {
        abstract();
    }
    getStringValue(name: string): string {
        abstract();
    }
    getShort(name: string): number {
        abstract();
    }
    getByte(name: string): number {
        abstract();
    }
    static create(): compoundTag {
        const tag = new compoundTag(true);
        tag.construct();
        return tag;
    }
    clone(): compoundTag {
        abstract();
    }
    contains(name: string, type?: Tag.Type): boolean {
        if(!type) return this._containsAll(name);
        return this._containsType(name, type);
    }
    _containsAll(name: string): boolean {
        abstract();
    }
    _containsType(name: string, type: Tag.Type): boolean {
        abstract();
    }
    copy(): compoundTag {
        abstract();
    }
    deepCopy(other: compoundTag): void {
        abstract();
    }
    equals(other: Tag): boolean {
        abstract();
    }
    getBooleanValue(name: string): boolean {
        abstract();
    }
    getByteArray(name: string): VoidPointer {
        abstract();
    }
    getCompound(name: string): compoundTag {
        abstract();
    }
    getFloat(name: string): number {
        abstract();
    }
    getInt64(name: string): number {
        abstract();
    }
    getList(name: string): ListTag {
        abstract();
    }
    isEmpty(): boolean {
        abstract();
    }
    put(name: string, value: Tag): Tag {
        abstract();
    }
    putBoolean(name: string, value: boolean): void {
        abstract();
    }
    putByte(name: string, value: number): number {
        abstract();
    }
    putByteArray(name: string, value: VoidPointer): VoidPointer {
        abstract();
    }
    putCompound(name: string, value: compoundTag): compoundTag {
        abstract();
    }
    putFloat(name: string, value: number): number {
        abstract();
    }
    putInt64(name: string, value: number): number {
        abstract();
    }
    putShort(name: string, value: number): number {
        abstract();
    }
    putString(name: string, value: string): string {
        abstract();
    }
    remove(name: string): boolean {
        abstract();
    }
}

@nativeClass(0x10)
export class ListTag extends Tag {
    size(): number {
        abstract();
    }
    append(tag: Tag): void {
        abstract();
    }
    copy(): Tag {
        abstract();
    }
    copyList(): ListTag {
        abstract();
    }
    deleteChildren(): void {
        abstract();
    }
    equals(other: Tag): boolean {
        abstract();
    }
    get(index: number): Tag {
        abstract();
    }
    getCompound(index: number): compoundTag {
        abstract();
    }
    getDouble(index: number): number {
        abstract();
    }
    getFloat(index: number): number {
        abstract();
    }
    getInt(index: number): number {
        abstract();
    }
    getStringValue(index: number): string {
        abstract();
    }
}

compoundTag.prototype[NativeType.ctor] = hacker.js("??0CompoundTag@@QEAA@XZ", void_t, {this:compoundTag});
// Broken, crashes when used
// compoundTag.prototype[NativeType.dtor] = hacker.js("??1compoundTag@@UEAA@XZ", void_t, {this:compoundTag});
compoundTag.prototype.get = hacker.js("?get@CompoundTag@@QEAAPEAVTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", compoundTag, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getInt = hacker.js("?getInt@CompoundTag@@QEBAHV?$basic_string_span@$$CBD$0?0@gsl@@@Z", int32_t, {this:compoundTag}, basic_string_span);
// compoundTag::getString is defined in PrivatePointer so use getStringValue instead
compoundTag.prototype.getStringValue = hacker.js("?getString@CompoundTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", CxxString, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getShort = hacker.js("?getShort@CompoundTag@@QEBAFV?$basic_string_span@$$CBD$0?0@gsl@@@Z", int16_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getByte = hacker.js("?getByte@CompoundTag@@QEBAEV?$basic_string_span@$$CBD$0?0@gsl@@@Z", int8_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype.putInt = hacker.js("?putInt@CompoundTag@@QEAAAEAHV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z", int32_t, {this:compoundTag}, CxxString, int32_t);
compoundTag.prototype.clone = hacker.js("?clone@CompoundTag@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", compoundTag, {this:compoundTag});
compoundTag.prototype._containsAll = hacker.js("?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", bool_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype._containsType = hacker.js("?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@W4Type@Tag@@@Z", bool_t, {this:compoundTag}, basic_string_span, int32_t);
compoundTag.prototype.copy = hacker.js("?copy@CompoundTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ", compoundTag, {this:compoundTag});
compoundTag.prototype.deepCopy = hacker.js("?deepCopy@CompoundTag@@QEAAXAEBV1@@Z", compoundTag, {this:compoundTag}, compoundTag);
compoundTag.prototype.equals = hacker.js("?equals@CompoundTag@@UEBA_NAEBVTag@@@Z", bool_t, {this:compoundTag}, Tag);
// compoundTag::getBoolean is defined in PrivatePointer so use getBooleanValue instead
compoundTag.prototype.getBooleanValue = hacker.js("?getBoolean@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", bool_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getByteArray = hacker.js("?getByteArray@CompoundTag@@QEBAAEBUTagMemoryChunk@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", VoidPointer /* TagMemoryChunk */, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getCompound = hacker.js("?getCompound@CompoundTag@@QEAAPEAV1@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", compoundTag, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getFloat = hacker.js("?getFloat@CompoundTag@@QEBAMV?$basic_string_span@$$CBD$0?0@gsl@@@Z", float32_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getInt64 = hacker.js("?getInt64@CompoundTag@@QEBA_JV?$basic_string_span@$$CBD$0?0@gsl@@@Z", int64_as_float_t, {this:compoundTag}, basic_string_span);
compoundTag.prototype.getList = hacker.js("?getList@CompoundTag@@QEAAPEAVListTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", ListTag, {this:compoundTag}, basic_string_span);
compoundTag.prototype.isEmpty = hacker.js("?isEmpty@CompoundTag@@QEBA_NXZ", bool_t, {this:compoundTag});
compoundTag.prototype.put = hacker.js("?put@CompoundTag@@QEAAAEAVTag@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@$$QEAV2@@Z", Tag, {this:compoundTag}, CxxString, Tag);
compoundTag.prototype.putBoolean = hacker.js("?putBoolean@CompoundTag@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z", void_t, {this:compoundTag}, CxxString, bool_t);
compoundTag.prototype.putByte = hacker.js("?putByte@CompoundTag@@QEAAAEAEV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@E@Z", uint8_t, {this:compoundTag}, CxxString, uint8_t);
compoundTag.prototype.putByteArray = hacker.js("?putByteArray@CompoundTag@@QEAAAEAUTagMemoryChunk@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@U2@@Z", VoidPointer /* TagMemoryChunk */, {this:compoundTag}, CxxString, VoidPointer /* TagMemoryChunk */);
compoundTag.prototype.putCompound = hacker.js("?putCompound@CompoundTag@@QEAAAEAV1@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V1@@Z", compoundTag, {this:compoundTag}, CxxString, compoundTag);
compoundTag.prototype.putFloat = hacker.js("?putFloat@CompoundTag@@QEAAAEAMV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@M@Z", float32_t, {this:compoundTag}, CxxString, float32_t);
compoundTag.prototype.putInt64 = hacker.js("?putInt64@CompoundTag@@QEAAAEA_JV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_J@Z", int64_as_float_t, {this:compoundTag}, CxxString, int64_as_float_t);
compoundTag.prototype.putShort = hacker.js("?putShort@CompoundTag@@QEAAAEAFV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@F@Z", int16_t, {this:compoundTag}, CxxString, int16_t);
compoundTag.prototype.putString = hacker.js("?putString@CompoundTag@@QEAAAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V23@0@Z", CxxString, {this:compoundTag}, CxxString, CxxString);
compoundTag.prototype.remove = hacker.js("?remove@CompoundTag@@QEAA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", bool_t, {this:compoundTag}, basic_string_span);

// ListTag.prototype[NativeType.ctor] = hacker.js("??0ListTag@@QEAA@XZ", void_t, {this:ListTag});
// ListTag.prototype[NativeType.dtor] = hacker.js("??1ListTag@@UEAA@XZ", void_t, {this:ListTag}); // TODO: test destructor as compoundTag's destructor does not work
// ListTag.prototype.getCompound = hacker.js("?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z", compoundTag, {this:ListTag}, uint64_as_float_t);
// ListTag.prototype.size = hacker.js("?size@ListTag@@QEBAHXZ", int32_t, {this:ListTag});
// // ListTag.prototype.append = hacker.js("?add@ListTag@@QEAAXV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@@Z", void_t, {this:ListTag}, Tag);
// // ListTag.prototype.copy = hacker.js("?copy@ListTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ", Tag, {this:ListTag});
// // ListTag.prototype.copyList = hacker.js("?copyList@ListTag@@QEBA?AV?$unique_ptr@VListTag@@U?$default_delete@VListTag@@@std@@@std@@XZ", ListTag, {this:ListTag});
// // ListTag.prototype.deleteChildren = hacker.js("?deleteChildren@ListTag@@UEAAXXZ", void_t, {this:ListTag});
// // ListTag.prototype.equals = hacker.js("?equals@ListTag@@UEBA_NAEBVTag@@@Z", bool_t, {this:ListTag}, Tag);
// ListTag.prototype.get = hacker.js("?get@ListTag@@QEBAPEAVTag@@H@Z", Tag, {this:ListTag}, int32_t);
// // ListTag.prototype.getCompound = hacker.js("?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z", compoundTag, {this:ListTag}, int32_t);
// ListTag.prototype.getDouble = hacker.js("?getDouble@ListTag@@QEBANH@Z", int32_t, {this:ListTag}, int32_t);
// ListTag.prototype.getFloat = hacker.js("?getFloat@ListTag@@QEBAMH@Z", int32_t, {this:ListTag}, int32_t);
// // // ListTag.prototype.getInt = hacker.js("?getInt@ListTag@@QEBAHH@Z", int32_t, {this:ListTag}, int32_t);
// // ListTag.prototype.getStringValue = hacker.js("?getString@ListTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z", CxxString, {this:ListTag}, int32_t);
