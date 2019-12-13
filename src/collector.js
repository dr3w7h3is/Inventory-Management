var http = require("http");
var fs = require("fs");

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
      req.on("data", chunk => {
        body += chunk;
      });
      req.on("end", a => {
        res.write(body);
        handlePost(body);
        res.end();
      });
    } else if (req.method === "GET") {
      if (req.url.toLowerCase() === "/dump") {
        res.end(JSON.stringify(db));
      }
      if (req.url.toLowerCase() === "/remove") {
        //
        res.statusCode = 501;
        res.end();
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
  js.ctrl_num = cNum + 1;
  db.database.push(js);
  fs.writeFileSync(dbFile, JSON.stringify(db), "utf8");
}

function initdb() {
  var raw = "";
  if (fs.existsSync(dbFile)) {
    var raw = fs.readFileSync(dbFile, "utf8");
  } else{
    fs.mkdirSync(baseDir)
  }

  if (raw === "") {
    raw = {
      database: []
    };
  }
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}
