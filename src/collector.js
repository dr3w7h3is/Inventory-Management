var http = require("http");
var fs = require("fs");
var url = require('url');
var Crypto = require("crypto-js");

var baseDir = process.cwd() + '/data/'
var dbFile = baseDir + "fake-data.json";

var recordsDB = initdb();

var categoryDB = [
  {
    key:'network',
    name: 'Network Equipment',
    color:'red',
    symbol:'fa-cloud-download'
  },
  {
    key:'server',
    name: 'Servers',
    color:'blue',
    symbol:'fa-microchip'
  },
  {
    key:'test',
    name: "Test Tools",
    color:'green',
    symbol:'fa-wrench'
  },
  {
    key:'simulation',
    name: "Simulation Tools",
    color:'orange',
    symbol:'fa-users'
  }
]


var data = "";
http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    let body = "";

    if (req.method === "POST") {
      if (req.url.toLowerCase() === "/remove") {
        req.on("data", chunk => {
          body += chunk;
        });
        req.on("end", a => {
          res.write(body);
          delEnrtry(body);
          res.end();
        });
      }
      if (req.url.toLowerCase() === "/") {
        req.on("data", chunk => {
          body += chunk;
        });
        req.on("end", a => {
          res.write(body);
          handlePost(body);
          res.end();
        });
      }
    } else if (req.method === "GET") {
      if (req.url.toLowerCase() === "/dump") {
        res.end(JSON.stringify(recordsDB));
      }
      if (req.url.toLowerCase() === "/remove") {
        //
        res.statusCode = 501;
        res.end();
      }
      if (req.url.toLowerCase().includes("/category")) {
        var cat = url.parse(req.url).pathname.split('/').pop();
        if (cat === '') {
          res.end(JSON.stringify(getCategories()))
        } else {
          let records  = getCategory(cat)
          res.end(JSON.stringify(records));
        }
      }
    } else {
      res.statusCode = 405;
      res.end();
    }
  })
  .listen(8080);


function getCategory(category) {
  return recordsDB.database.filter(record => record.type === category)
}

function getCategories() {
  return categoryDB
}

function handlePost(data) {
  let js = JSON.parse(data);
  var cNum = recordsDB.database.length;
  cNum = Crypto.MD5(data, "secret");
  //Remove slice if longer control number is desired
  js.ctrl_num = cNum.toString().slice(-10);
  recordsDB.database.push(js);
  fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
}

function initdb() {
  var raw = "";
  if (fs.existsSync(dbFile)) {
    var raw = fs.readFileSync(dbFile, "utf8");
  } else {
    fs.mkdirSync(baseDir)
  }

  if (raw === "") {
    raw = {
      database: []
    };
  }
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

function delEnrtry(entryNum) {
  var raw = "";
  raw = fs.readFileSync(dbFile, "utf8");
  recordsDB.database = recordsDB.database.filter(r => r.ctrl_num != entryNum)
  fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
}
