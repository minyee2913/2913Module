import { events } from "bdsx/event";
import Event from "krevent";

events.serverLog.on((log)=>{
    if (log === "[INFO] Server stop requested.") {
        StopRequested.fire();
    }
});

export const StopRequested = new Event<() => void>();