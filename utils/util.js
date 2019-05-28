const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute,second].map(formatNumber).join(':')
};
const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-')
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};

var dateSort= function (array) {
  var dateToTime = function (str) {
    return (new Date(str.replace(/-/g, '/'))).getTime();
  }
  for (var i = 0; i < array.length; i++) {
    array[i].publishTimeNew = dateToTime(array[i].date);
  }
  array.sort(function (a, b) {
    return b.publishTimeNew > a.publishTimeNew ? 1 : -1;
  });
  for (var i = 0; i < array.length; i++) {
    var ll = array[i].date.split(" ");
    ll = ll[0]
    array[i].date = ll;
  }
  return array
};

var replySort = function (array) {
  var dateToTime = function (str) {
    return (new Date(str.replace(/-/g, '/'))).getTime();
  }
  for (var i = 0; i < array.length; i++) {
    array[i].publishTimeNew = dateToTime(array[i].date);
  }
  array.sort(function (a, b) {
    return b.publishTimeNew > a.publishTimeNew ? -1 : 1;
  });
  for (var i = 0; i < array.length; i++) {
    var ll = array[i].date.split(" ");
    ll = ll[0]
    array[i].date = ll;
  }
  return array
};

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  dateSort:dateSort,
  replySort: replySort
};
