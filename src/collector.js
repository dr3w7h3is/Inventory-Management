var http = require("http");
var fs = require("fs");
var Crypto = require("crypto-js");

var baseDir = process.cwd() + '/data/'
var dbFile = baseDir + "fake-data.json";

var db = initdb();

var data = "";
http
  .createServer(function(req, res) {
    res.setHeader("Content-Type", "application/json" );
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
        res.end(JSON.stringify(db));
      }
    } else {
      res.statusCode = 405;
      res.end();
    }
  })
  .listen(8080);

function handlePost(data) {
  let js = JSON.parse(data);
  var cNum = db.database.length;
  cNum = Crypto.MD5(data, "secret");
  //Remove slice if longer control number is desired
  js.ctrl_num = cNum.toString().slice(-10);
  db.database.push(js);
  fs.writeFileSync(dbFile, JSON.stringify(db), "utf8");
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
  db.database = db.database.filter(r => r.ctrl_num != entryNum)
  fs.writeFileSync(dbFile, JSON.stringify(db), "utf8");
}
