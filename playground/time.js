const moment = require('moment');

const date = moment();//initializing moment without any argument will be equivalent to initializing with time.now
//date.add(9,'months').subtract(5,'days');
// console.log(date.format('MMM Do YYYY'));

console.log(date.format('YYYY MMM Do h:mm a'));

console.log(moment().valueOf());//get the unix timestamp

console.log(moment(1526375379892).fromNow());
