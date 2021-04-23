"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToKorean = exports.numberFormat = void 0;
function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.numberFormat = numberFormat;
function numberToKorean(number) {
    var inputNumber = number < 0 ? false : number;
    var unitWords = ['', '만', '억', '조', '경'];
    var splitUnit = 10000;
    var splitCount = unitWords.length;
    var resultArray = [];
    var resultString = '';
    for (var i = 0; i < splitCount; i++) {
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }
    for (var i = 0; i < resultArray.length; i++) {
        if (!resultArray[i])
            continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }
    if (number === 0)
        resultString = "0";
    return resultString;
}
exports.numberToKorean = numberToKorean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyRm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibnVtYmVyRm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxDQUFLO0lBQzlCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRkQsb0NBRUM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBYTtJQUN4QyxJQUFJLFdBQVcsR0FBUSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuRCxJQUFJLFNBQVMsR0FBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLFNBQVMsR0FBTSxLQUFLLENBQUM7SUFDekIsSUFBSSxVQUFVLEdBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxJQUFJLFdBQVcsR0FBSSxFQUFFLENBQUM7SUFDdEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXRCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckYsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFDO1lBQ2YsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUMvQjtLQUNKO0lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDeEMsSUFBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBRSxTQUFTO1FBQzdCLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztLQUNyRjtJQUNELElBQUksTUFBTSxLQUFLLENBQUM7UUFBRSxZQUFZLEdBQUcsR0FBRyxDQUFBO0lBRXBDLE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUF2QkQsd0NBdUJDIn0=