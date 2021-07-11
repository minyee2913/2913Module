import { events } from "bdsx/event";
import { Event } from "bdsx/eventtarget";
let fired = false;
events.serverLog.on((log)=>{
    if (log === "[INFO] Server stop requested.") {
        fired = true;
        StopRequested.fire();
    }
});
events.serverClose.on(()=>{
    if (fired === false) StopRequested.fire();
})

export const StopRequested = new Event<() => void>();