angular.module('PSTakeCareApp')
	.factory('hospitalTimingService', [ function(){
		
		function formatTimings(hospital){
			var timing = hospital.timing;
			var finalTimingArray = { workingDays: [] };
			var week = {
				'mon': 'Monday',
				'tue': 'Tuesday',
				'wed': 'Wednesday',
				'thu': 'Thursday',
				'fri': 'Friday',
				'sat': 'Saturday',
				'sun': 'Sunday'
			}
			function compareTimeSlots(oneDay,anotherDay){
				if(oneDay.length == anotherDay.length){
					for(var i=0;i<oneDay.length;i++){
						if(!angular.equals(oneDay[i],anotherDay[i])){
							return false;
						}
					}
				}
				else {
					return false;
				}
				return true;
			}
			
			for (var day in timing) {
				if (timing.hasOwnProperty(day)) {
					var timeArray = timing[day];
					if(timeArray.length === 0){
						finalTimingArray.offDays = finalTimingArray.offDays || [];
						finalTimingArray.offDays.push(week[day]);
					} else {
						var matched = false;
						for(var i=0,value=finalTimingArray.workingDays;i<value.length;i++){
							matched = compareTimeSlots(value[i].timeArray,timeArray);
							if(matched == true){
						 		value[i].days.push(week[day]);
						 		break;
						 	}
						}
						if(matched == false){
							finalTimingArray.workingDays.push({ days:[week[day]], timeArray:timeArray });
						}
					}
				}
			}
			finalTimingArray.workingDays.sort(function(a, b) {
    			return b.days.length - a.days.length;
			});
			console.log(finalTimingArray);
			return finalTimingArray;
		}
		
		function convert24HoursFormatTo12(timeFormat){
			var minutes = ((timeFormat%100)<10)?('0'+(timeFormat%100)):((timeFormat%100));
			var hours = Math.floor(timeFormat/100);
			var time = hours<12 ? ( (hours<10)?('0'+hours+':'+minutes+ ' AM'):(hours+':'+minutes+ ' AM')) : (hours+':'+minutes+' PM');
			return time;
		}
		
		function getStandardTimingString(standardTimingObject){
			var slot,fromSlot,toSlot,days,timeString="";
			for(var i=0,len=standardTimingObject.workingDays.length;i<len;i++){
				if(len === 1){
					for(var j=0;j<standardTimingObject.workingDays[i].timeArray.length;j++){
						slot = standardTimingObject.workingDays[i].timeArray[j];
						if(slot.from == 0 && slot.to == 2359 && standardTimingObject.offDays){
							return "24x7";	
						} else {
							fromSlot = convert24HoursFormatTo12(slot.from);
							toSlot = convert24HoursFormatTo12(slot.to);
							timeString+=(j==0)?('Daily: ' + fromSlot + ' - ' + toSlot):(' & ' + fromSlot + ' - ' + toSlot);
						}
					}
				} else if(len>1) {
					if(i>0) {
						timeString+='\n';
					}
					for(var k=0;k<standardTimingObject.workingDays[i].timeArray.length;k++){
						slot = standardTimingObject.workingDays[i].timeArray[k];
						days = standardTimingObject.workingDays[i].days;
						fromSlot = convert24HoursFormatTo12(slot.from);
						toSlot = convert24HoursFormatTo12(slot.to);
						if(i===0){
							timeString+=(k==0)?('Daily: ' + fromSlot + ' - ' + toSlot):(' & ' + fromSlot + ' - ' + toSlot + ' except');
						} else{
							timeString+=(k==0)?( days.join(',') + ': ' + fromSlot + ' - ' + toSlot):(' & ' + fromSlot + ' - ' + toSlot);
						}
					}
				}
			}
			if(standardTimingObject.offDays){
				timeString+='\n' + standardTimingObject.offDays.join(' & ') + ' closed!';
			}
			return timeString;
		}
		
		function createRouteName(name){
			return name.split(" ").join("-").toLowerCase();
		}
		
		function getHospitalOpeningTimings(hospitals) {
			var standardTimingObject;
			angular.forEach(hospitals,function(hospital) {
				standardTimingObject = formatTimings(hospital);
				hospital.standardTimingString = getStandardTimingString(standardTimingObject);
				hospital.routeName = createRouteName(hospital.name);
			});
		}
		
	return {
		getHospitalOpeningTimings: getHospitalOpeningTimings
	}
}]);