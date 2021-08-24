import { pdb } from "bdsx/core";
import { UNDNAME_NAME_ONLY } from "bdsx/dbghelp";
import { ProcHacker } from "bdsx/prochacker";

const symbols = [
    'Block::getName',
    'BlockSource::getBlock',
    'SignBlockActor::setMessage',
    'SignBlockActor::_onUpdatePacket',
    'SignBlockActor::SignBlockActor',
    'BlockActor::save',
    'SignBlockActor::save',
    'ListTag::getInt',
    'ActorDamageByActorSource::getDamagingEntityUniqueID',
    'EnchantUtils::getEnchantLevel',
    'EnchantUtils::hasEnchant',
    'ItemEnchants::_toList',
    'ItemEnchants::getEnchantNames',
    'ItemStackBase::constructItemEnchantsFromUserData',

] as const

const symbols2 = [
    '?getBlockEntity@BlockSource@@QEAAPEAVBlockActor@@AEBVBlockPos@@@Z',
    '?setMessage@SignBlockActor@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@0@Z',
    '??0CompoundTag@@QEAA@XZ',
    '??1CompoundTag@@UEAA@XZ',
    '?getInt@CompoundTag@@QEBAHV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?putInt@CompoundTag@@QEAAAEAHV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z',
    '?print@CompoundTag@@UEBAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAVPrintStream@@@Z',
    '?get@CompoundTag@@QEAAPEAVTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z',
    '?getString@CompoundTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?size@ListTag@@QEBAHXZ',
    '?getShort@CompoundTag@@QEBAFV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getByte@CompoundTag@@QEBAEV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?clone@CompoundTag@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ',
    '?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@W4Type@Tag@@@Z',
    '?copy@CompoundTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ',
    '?deepCopy@CompoundTag@@QEAAXAEBV1@@Z',
    '?equals@CompoundTag@@UEBA_NAEBVTag@@@Z',
    '?getBoolean@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getByteArray@CompoundTag@@QEBAAEBUTagMemoryChunk@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getCompound@CompoundTag@@QEAAPEAV1@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getFloat@CompoundTag@@QEBAMV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getInt64@CompoundTag@@QEBA_JV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getList@CompoundTag@@QEAAPEAVListTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?isEmpty@CompoundTag@@QEBA_NXZ',
    '?put@CompoundTag@@QEAAAEAVTag@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@$$QEAV2@@Z',
    '?putBoolean@CompoundTag@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z',
    '?putByte@CompoundTag@@QEAAAEAEV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@E@Z',
    '?putByteArray@CompoundTag@@QEAAAEAUTagMemoryChunk@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@U2@@Z',
    '?putCompound@CompoundTag@@QEAAAEAV1@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V1@@Z',
    '?putFloat@CompoundTag@@QEAAAEAMV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@M@Z',
    '?putInt64@CompoundTag@@QEAAAEA_JV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_J@Z',
    '?putShort@CompoundTag@@QEAAAEAFV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@F@Z',
    '?putString@CompoundTag@@QEAAAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V23@0@Z',
    '?remove@CompoundTag@@QEAA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z',
    '??0ListTag@@QEAA@XZ',
    '??1ListTag@@UEAA@XZ',
    '?add@ListTag@@QEAAXV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@@Z',
    '?copy@ListTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ',
    '?copyList@ListTag@@QEBA?AV?$unique_ptr@VListTag@@U?$default_delete@VListTag@@@std@@@std@@XZ',
    '?deleteChildren@ListTag@@UEAAXXZ',
    '?equals@ListTag@@UEBA_NAEBVTag@@@Z',
    '?get@ListTag@@QEBAPEAVTag@@H@Z',
    '?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z',
    '?getDouble@ListTag@@QEBANH@Z',
    '?getFloat@ListTag@@QEBAMH@Z',
    '?getInt@ListTag@@QEBAHH@Z',
    '?getString@ListTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z',
    '?save@ItemStackBase@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ',
    '?constructItemEnchantsFromUserData@ItemStackBase@@QEBA?AVItemEnchants@@XZ',
    '?canEnchant@EnchantUtils@@SA?AUEnchantResult@@AEBVItemStackBase@@W4Type@Enchant@@H_N@Z',
    '?clone@ItemStack@@QEBA?AV1@XZ'

] as const

const proc = pdb.getList(pdb.coreCachePath, {}, symbols, false, UNDNAME_NAME_ONLY);
type proc = typeof proc;

const proc2 = pdb.getList(pdb.coreCachePath, {}, symbols2);
type proc2 = typeof proc2;
export const hacker = new ProcHacker(Object.assign({}, proc, proc2));
pdb.close();