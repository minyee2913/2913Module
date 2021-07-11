import { bool_t, CxxString, int16_t, int32_t } from "bdsx/nativetype";
import { ItemStack } from "bdsx/bds/inventory";
import { hacker } from "./hacker";
import { abstract } from "bdsx/common";

export enum enchantment {
    protection = 0,
    fire_protection = 1,
    feather_falling = 2,
    blast_protection = 3,
    projectile_protection = 4,
    thorns = 5,
    respiration = 6,
    depth_strider = 7,
    aqua_affinity = 8,
    sharpness = 9,
    smite = 10,
    bane_of_arthropods = 11,
    knockback = 12,
    fire_aspect = 13,
    looting = 14,
    efficiency = 15,
    silk_touch = 16,
    unbreaking = 17,
    fortune = 18,
    power = 19,
    punch = 20,
    flame = 21,
    infinity = 22,
    luck_of_the_sea = 23,
    lure = 24,
    frost_walker = 25,
    mending = 26,
    binding_curse = 27,
    vanishing_curse = 28,
    impaling = 29,
    riptide = 30,
    loyalty = 31,
    channeling = 32,
    multishot = 33,
    piercing = 34,
    quick_charge = 35,
    soul_speed = 36
}

export class enchantUtils {
    static applyEnchant(itemstack:ItemStack, enchant:enchantment, level:number, isUnsafe:boolean):boolean{
        abstract();
    };
    static getEnchantLevel(enchant:enchantment, itemstack:ItemStack):number{
        abstract();
    };
    static hasEnchant(enchant:enchantment, itemstack:ItemStack):boolean{
        abstract();
    };
}

enchantUtils.applyEnchant = hacker.js("?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z", bool_t, null, ItemStack, int16_t, int32_t, bool_t);
enchantUtils.getEnchantLevel = hacker.js("EnchantUtils::getEnchantLevel", int32_t, null, int16_t, ItemStack);
enchantUtils.hasEnchant = hacker.js("EnchantUtils::hasEnchant", bool_t, null, int16_t, ItemStack);