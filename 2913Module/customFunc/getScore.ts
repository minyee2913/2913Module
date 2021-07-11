import { bedrockServer } from "bdsx/launcher";
import { events } from "bdsx/event";
import { serverInstance } from "bdsx/bds/server";
import { Level } from "bdsx/bds/level";
import { Actor } from "bdsx/bds/actor";
import { ScoreboardId, ScoreInfo } from "../../../bdsx/bds/scoreboard";

let system!:IVanillaServerSystem;
events.serverOpen.on(()=>{
    system = server.registerSystem(0,0);
});
if (bedrockServer.isLaunched()) system = server.registerSystem(0,0);


export function getScore(targetName: string, objectives: string, handler = (result: any) => {}) {
    system.executeCommand(`scoreboard players add @a[name="${targetName}",c=1] ${objectives} 0`, result => {
        // @ts-ignore
        let msgs = result.data.statusMessage;
        let msg = String(msgs).split('now');
        let a = String(msg[1]);
        let s = 0;
        if (a.includes('-') === true) s = Number(a.replace(/[^0-9  ]/g, '')) - (Number(a.replace(/[^0-9  ]/g, '')) * 2);
        if (a.includes('-') === false) s = Number(a.replace(/[^0-9  ]/g, ''));
        if (isNaN(s)) s = 0;
        handler(s);
        (msgs as any) = null;
        (msg as any) = null;
        (a as any) = null;

    });
    return;
};

export function getScoreSync(target: Actor|string, objectives: string):null|number{
    let level = serverInstance.minecraft.getLevel();
    if (!(level instanceof Level)) return null;
    let score = level.getScoreboard();
    let obj = score.getObjective(objectives)!;
    if (obj === null) return null;
    let id!:ScoreboardId;
    if (target instanceof Actor) {
        if (target.isPlayer()) id = score.getPlayerScoreboardId(target);
        else id = score.getActorScoreboardId(target);
    } else id = score.getFakePlayerScoreboardId(target);
    return obj.getPlayerScore(id).value;
}