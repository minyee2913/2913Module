import { readFileSync } from "fs";
import { XuidByName } from "../packets";

export function playerPermission(playerName: string, ResultEvent = (perm: any) => {}) {
    let xuid = XuidByName(playerName);
    var operJs:{permission:string, xuid:string}[];
    let permissions = '';
    try {
        operJs = JSON.parse(readFileSync("permissions.json", "utf8"));
        let Js = operJs.find((v)=> v.xuid === xuid);
        if (Js != undefined) permissions = Js.permission;
        if (Js === undefined) permissions = 'member';
    } catch(err) {
        permissions = 'member';
    }
    ResultEvent(permissions);
    return permissions;
};