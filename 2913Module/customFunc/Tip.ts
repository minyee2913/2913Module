import { Actor, bedrockServer } from "bdsx";
import { events } from "bdsx/event";
import { IdByName, playerList, sendText } from "../packets";
import { StopRequested } from "./stopRequest";
let system!:IVanillaServerSystem;
events.serverOpen.on(()=>{
    system = server.registerSystem(0,0);
});
if (bedrockServer.isLaunched()) system = server.registerSystem(0,0);

let i = setInterval(function run(){
    playerList.forEach((n)=>{
        let target = IdByName(n);
        let actor = target.getActor()!;
        if (!(actor instanceof Actor)) return;
        let Entity = actor.getEntity();
        let tags:string[] = [];
        let tag = system.getComponent(Entity, "minecraft:tag")!;
        try {
            tags = tag.data;
        } catch {
            return;
        }
        let f = tags.find((v)=> v.startsWith("tips_:"));
        if (f === undefined) return;
        bedrockServer.executeCommand(`tag @a[c=1,name="${n}"] remove ${f}`);
        sendText(target, f.replace("tips_:", "").replace(/-s/gi, " "), 5);
        (tags as any) = null;
    });
},100);

StopRequested.on(()=>{
    clearInterval(i);
})