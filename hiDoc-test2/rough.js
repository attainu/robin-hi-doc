const moment = require("moment");
const { isMoment } = require("moment");
// let dateObj = new Date();
// let month = String(dateObj.getMonth()).padStart(2,0);
// let day = String(dateObj.getDate()).padStart(2,0);
// let year = dateObj.getFullYear();
// let output = day  + '/'+ month  + '/' + year;

// console.log(output)
// function hi(x,y){
//    console.log(moment().format('L, hh:mm a'))
//    return moment().creationData()
// }

// console.log(hi(0,'days'))

// console.log(moment('05-17-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'))
// class Schedule {
//   constructor([date, month, year, hours, minutes]) {
//     this.schedule = moment()
//       .set({
//         date: date,
//         month: month - 1,
//         year: year,
//         hour: hours,
//         minute: minutes,
//       })
//       .format("ll");
//   }
// }
// let schedule = new Schedule([20, 12, 2021, 9, 30]);
// console.log(schedule.schedule);
// console.log(new Date(schedule.schedule).getFullYear());
// console.log(schedule.schedule.split(" "));
// console.log(
//   new Date().getMonth(),
//   new Date().getDate(),
//   new Date().getHours(),
//   new Date().getMinutes()
// );
// let sub = schedule.schedule.split(' ')
// console.log(schedule.schedule.split(' ')[4].split(':'))
// let obj = {"key1":1,
//             "key2":2,
//         "key3":3,
//          "key4":{"a":1,"b":2}}
// console.log(Object.keys(obj))

// let obj2 = {"key1":"a","key2":"b","key3":"c","key4":{"a":5,"b":6}}

// function findModify(arr,brr){
//     for(i in brr){
//         if(arr[0]==brr[i][0] && arr[1]<=brr[i][1]){
//             brr = brr.splice(i,1)
//             return brr
//         }
//     }
//     return false
// }
// console.log(findModify([9,]))
// console.log(new Date().getMinutes())
// console.log(moment("").isValid());
// console.log(moment("09:30").subtract(30, "minutes") - moment("09:00"));

// const timings = "9:32-10:02";
// const arr = timings.split("-");
// const first = arr[0].split(":");
// const second = arr[1].split(":");
// const startHour = parseInt(first[0]);
// const startMin = parseInt(first[1]);
// const endHour = parseInt(second[0]);
// const endMin = parseInt(second[1]);

// if (
//   !(
//     (endHour - startHour == 1 && startMin - endMin == 30) ||
//     (endHour - startHour == 0 && endMin - startMin == 30)
//   )
// )
//   console.log("error");
// else console.log("okay");

console.log(moment().format("YYYY-MM-DD hh:MM"));
const now = moment();
const then = moment("2020-06-22");
console.log(then.isBefore(now));
console.log(moment("2020-06-20 9:30", "YYYY-MM-DD HH:mm").isBefore(now));
