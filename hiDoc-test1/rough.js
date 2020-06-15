const moment = require("moment")
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
// class Schedule{
//     constructor([date,month,year]){
//         this.schedule = moment().set({'date':date,'month':month-1,'year':year}).format('ll')
//     }
// }
// let schedule = new Schedule([20,12,2021])
// console.log(schedule.schedule)
// let obj = {"key1":1,
//             "key2":2,
//         "key3":3,
//          "key4":{"a":1,"b":2}}
// console.log(Object.keys(obj))

// let obj2 = {"key1":"a","key2":"b","key3":"c","key4":{"a":5,"b":6}}

function findModify(arr,brr){
    for(i in brr){
        if(arr[0]==brr[i][0] && arr[1]<=brr[i][1]){
            brr = brr.splice(i,1)
            return brr
        }
    }
    return false
}
console.log(findModify([9,]))