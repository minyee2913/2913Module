import { bedrockServer } from "bdsx";
import { events } from "bdsx/event";

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
        handler(s);
        (msgs as any) = null;
        (msg as any) = null;
        (a as any) = null;

    });
    return;
};