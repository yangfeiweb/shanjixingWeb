import _ from 'lodash';

function convert2Boolean(val) {
  let result = false;
  if (typeof val === 'string') {
    if (val === 'true' || val === '1') {
      result = true;
    }
  } else if (typeof val === 'number') {
    if (val > 0) {
      result = true;
    }
  } else if (val === true) {
    result = true;
  }
  return result;
}

function sortArrByRandom(arr) {
  return _.shuffle(arr);
}

function baseRandom(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function shuffle(arr) {
  let index = -1;
  let length = arr.length;
  let lastIndex = length - 1;
  while (++index < length) {
    let rand = baseRandom(index, lastIndex);
    let value = arr[rand];
    arr[rand] = arr[index];
    arr[index] = value;
  }
  return arr;
}

function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}

function randomExcept(lower, upper, except) {
  let result = baseRandom(lower, upper);
  if (result !== except) {
    return result;
  } else {
    return randomExcept(lower, upper, except);
  }
}

function randomLetter(source) {
  source = source.toLowerCase();
  let letterArr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  let sourceIdx = letterArr.findIndex(item => {
    return item === source;
  });
  let targetIdx = randomExcept(0, 25, sourceIdx);
  return letterArr[targetIdx];
}

function getTs() {
  return dateToTimeStr(new Date()).replace(/[\s|\s*-\s*|:]/g, '');
}

function getStorageNumId(name) {
  let id = getStorage().getItem(name);
  if (id !== undefined) {
    return parseInt(id);
  }
}

function getMonthLastDay(month) {
  let nextMonth = month + 1;
  let nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonth);
  nextMonthDate.setDate(1);
  let lastDate = new Date(nextMonthDate - 86400000);
  return lastDate.getDate();
}
// format yyyyMMddhhmmss to date obj
function timeStrToObj(str) {
  let yyyy = str.substr(0, 4);
  let mth = str.substr(4, 2) - 1;
  let dd = str.substr(6, 2);
  let hh = str.substr(8, 2) || '00';
  let mm = str.substr(10, 2) || '00';
  let ss = str.substr(12, 2) || '00';
  return new Date(yyyy, mth, dd, hh, mm, ss);
}

function dateNum2Str(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num + '';
  }
}
// format date to yyyyMMddhhmmss
// function dateToTimeStr(date) {
//     let yyyy = date.getFullYear()
//     let mth = dateNum2Str(date.getMonth() + 1)
//     let dd = dateNum2Str(date.getDate())
//     let hh = dateNum2Str(date.getHours())
//     let mm = dateNum2Str(date.getMinutes())
//     let ss = dateNum2Str(date.getSeconds())
//     return yyyy + mth + dd + hh + mm + ss
// }

function getStorage() {
  let plus = window.plus;
  if (plus) {
    return plus.storage;
  } else {
    return localStorage;
  }
}

// 返回十六进制的随机颜色
function randHexColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  if (r < 16) {
    r = '0' + r.toString(16);
  } else {
    r = r.toString(16);
  }
  if (g < 16) {
    g = '0' + g.toString(16);
  } else {
    g = g.toString(16);
  }
  if (b < 16) {
    b = '0' + b.toString(16);
  } else {
    b = b.toString(16);
  }

  return '0x' + r + g + b;
}
// format date to yyyy-MM-dd hh:mm:ss
function dateToTimeStr(date) {
  let yyyy = date.getFullYear();
  let mth = dateNum2Str(date.getMonth() + 1);
  let dd = dateNum2Str(date.getDate());
  let hh = dateNum2Str(date.getHours());
  let mm = dateNum2Str(date.getMinutes());
  let ss = dateNum2Str(date.getSeconds());
  return `${yyyy}-${mth}-${dd} ${hh}:${mm}:${ss}`;
}
// 返回 yyyyMMdd 时间
function parseDate(date) {
  let format = date.toLocaleDateString();
  let data = format.split('/');
  let str = '';
  data.forEach(item => {
    if (item < 10) {
      item = '0' + item;
    }
    str += item;
  });
  return str;
}

function computedVipDay(serverTime, vipDeadTime) {
  // 计算vip剩余天数
  let date1 = new Date(serverTime);
  let date2 = new Date(vipDeadTime);
  let s1 = date1.getTime();
  let s2 = date2.getTime();
  let days = 0;
  if (s1 >= s2) {
    days = 0;
  } else {
    let totalTime = (s2 - s1) / 1000;
    let day = parseInt(totalTime / (24 * 60 * 60)); // 计算整数天数
    let afterDay = totalTime - day * 24 * 60 * 60; // 取得算出天数后剩余的秒数
    if (afterDay > 0) {
      days = day + 1;
    } else {
      days = day;
    }
  }
  return days;
}

export default {
  convert2Boolean,
  sortArrByRandom,
  getStorageNumId,
  getMonthLastDay,
  timeStrToObj,
  dateToTimeStr,
  getStorage,
  randHexColor,
  parseDate,
  getTs,
  computedVipDay,
  baseRandom,
  shuffle,
  arraySample,
  randomExcept,
  randomLetter,
  dateNum2Str
};
