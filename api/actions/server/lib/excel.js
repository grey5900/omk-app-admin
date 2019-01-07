/**
 * Created by isaac on 1/3/16.
 */

var moment = require('moment');
var path = require('path');
var XLSX = require('xlsx');

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function stageOfWeight(type) {
  if (type) {
    return '上机后';
  } else {
    return '上机前';
  }
}

function contactOfUser(user) {
  if (user.mobile) {
    return user.mobile;
  } else if (user.email) {
    return user.email;
  }
  return '';
}

function stringFromTime(interval) {

  return moment(interval).format('YYYY-MM-DD');
}

function sexStringFrom(intVal) {

  if (intVal == 0) {
    return '男';
  } else {
    return '女';
  }
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C]};

      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function exportUser(workbook, user) {

  var data = [];
  data.push(['姓名', '性别', '联系方式', '年龄', '地址', '创建时间']);
  data.push([user.name ? user.name : '---',
    sexStringFrom(user.sex),
    contactOfUser(user),
    user.age ? user.age : '---',
    user.area ? user.area : '---',
    stringFromTime(user.create_time)]);

  var ws_name = "个人信息";
  var ws = sheet_from_array_of_arrays(data);
  workbook.SheetNames.push(ws_name);
  workbook.Sheets[ws_name] = ws;
}


function exportClothes(workbook, clothes) {

  var data = [];
  data.push(['重量', '类型', '备注', '是否常用', '创建时间']);

  for (var i = 0; i < clothes.length; ++i) {
    var cloth = clothes[i];

    data.push([cloth.weight, cloth.type, cloth.comment, cloth.is_common ? '是' : '否',
      stringFromTime(cloth.create_time)]);
  }

  var ws_name = "衣物记录";
  var ws = sheet_from_array_of_arrays(data);
  workbook.SheetNames.push(ws_name);
  workbook.Sheets[ws_name] = ws;
}


function exportWeights(workbook, weights) {
  var data = [];
  data.push(['体重', '类型', '衣物重量', '净重', '创建时间']);

  for (var i = 0; i < weights.length; ++i) {
    var w = weights[i];
    data.push([w.weight, stageOfWeight(w.type), w.cloth_weight, w.pure_weight, stringFromTime(w.create_time)]);
  }

  var ws_name = "体重记录";
  var ws = sheet_from_array_of_arrays(data);
  workbook.SheetNames.push(ws_name);
  workbook.Sheets[ws_name] = ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function exportXLSX(res, user, cloths, weights) {

  var wb = new Workbook();

  exportUser(wb, user);
  exportClothes(wb, cloths);
  exportWeights(wb, weights);

  /* write file */
  var name = new Date().getTime() + Math.random().toString(36).substring(7);
  name += '.xlsx';
  name = 'public/' + name;

  XLSX.writeFile(wb, name);

  res.sendFile(name, {root: path.resolve(__dirname, '../..')});
}

function exportUsers(res, users) {

  var wb = new Workbook();

  var data = [];
  data.push(['姓名', '性别', '联系方式', '年龄', '地址', '创建时间']);

  for (var i = 0; i < users.length; ++i) {
    var user = users[i];
    data.push([user.name ? user.name : '---',
      sexStringFrom(user.sex),
      contactOfUser(user),
      user.age ? user.age : '---',
      user.area ? user.area : '---',
      stringFromTime(user.create_time)]);
  }

  var ws_name = "个人信息";
  var ws = sheet_from_array_of_arrays(data);
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var name = new Date().getTime() + Math.random().toString(36).substring(7);
  name += '.xlsx';
  name = 'public/' + name;

  XLSX.writeFile(wb, name);

  res.sendFile(name, {root: path.resolve(__dirname, '../..')});
}


function exportSummary(res, summary) {

  var wb = new Workbook();
  var data = [];
  data.push(['姓名','电话号码', '体重记录数', '衣物数','使用频次' ,'上次活动时间']);

  for (var i = 0; i < summary.length; ++i) {
    var record = summary[i];
    data.push(record);
  }
  var ws_name = "统计信息";
  var ws = sheet_from_array_of_arrays(data);
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var name = new Date().getTime() + Math.random().toString(36).substring(7);
  name += '.xlsx';
  name = 'public/' + name;
  var root = path.resolve(__dirname, '../..');
  XLSX.writeFile(wb, path.join(root, name));
  res.sendFile(name, {root});
}

module.exports = {
  export: exportXLSX,
  exportUsers: exportUsers,
  exportSummary
};