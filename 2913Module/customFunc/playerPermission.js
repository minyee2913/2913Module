"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerPermission = void 0;
const fs_1 = require("fs");
const packets_1 = require("../packets");
function playerPermission(playerName, ResultEvent = (perm) => { }) {
    let xuid = packets_1.XuidByName(playerName);
    var operJs;
    let permissions = '';
    try {
        operJs = JSON.parse(fs_1.readFileSync("permissions.json", "utf8"));
        let Js = operJs.find((v) => v.xuid === xuid);
        if (Js != undefined)
            permissions = Js.permission;
        if (Js === undefined)
            permissions = 'member';
    }
    catch (err) {
        permissions = 'member';
    }
    ResultEvent(permissions);
    return permissions;
}
exports.playerPermission = playerPermission;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllclBlcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWtDO0FBQ2xDLHdDQUF3QztBQUV4QyxTQUFnQixnQkFBZ0IsQ0FBQyxVQUFrQixFQUFFLGNBQWMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDaEYsSUFBSSxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxJQUFJLE1BQXlDLENBQUM7SUFDOUMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUk7UUFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsSUFBSSxTQUFTO1lBQUUsV0FBVyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDakQsSUFBSSxFQUFFLEtBQUssU0FBUztZQUFFLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDaEQ7SUFBQyxPQUFNLEdBQUcsRUFBRTtRQUNULFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDMUI7SUFDRCxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQWRELDRDQWNDO0FBQUEsQ0FBQyJ9