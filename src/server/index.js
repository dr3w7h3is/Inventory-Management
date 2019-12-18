require('dotenv').config()
var http = require("http");
var fs = require("fs");
var url = require('url');

var crypto = require('crypto')
var baseDir = process.cwd() + '/data/'
var dbFile = baseDir + "fake-data.json";
var userDbFile = baseDir + "users.json"
var groupDbFile = baseDir + "groups.json"

var recordsDB = init(dbFile, { database: [] });
var usersDB = init(userDbFile, { users: [] });
var groupsDB = init(groupDbFile, { groups: [] });



var jwtHead = JSON.stringify({ alg: "HS256", typ: "JWT" })
  .toString('base64')
  .replace(/=/g, "")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");

function init(file, def) {
  var raw = '';
  if (fs.existsSync(file)) {
    raw = fs.readFileSync(file, 'utf8');
  } else if (!fs.existsSync(baseDir))
    fs.mkdirSync(baseDir);
  if (raw === '')
    raw = def;
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}



var categoryDB = [
  {
    key: 'network',
    name: 'Network Equipment',
    color: 'red',
    symbol: 'fa-cloud-download'
  },
  {
    key: 'server',
    name: 'Servers',
    color: 'blue',
    symbol: 'fa-microchip'
  },
  {
    key: 'test',
    name: "Test Tools",
    color: 'green',
    symbol: 'fa-wrench'
  },
  {
    key: 'simulation',
    name: "Simulation Tools",
    color: 'orange',
    symbol: 'fa-users'
  }
]

let endpoints = [{
  path: "/login",
  get: null,
  post: login
}, {
  path: "/dump",
  post: dumpDB,
  get: dumpDB
}, {
  path: "/add",
  post: addRecord,
  get: null
}, {
  path: "/remove",
  post: (req, res) => removeRecord(req, res, "POST"),
  get: (req, res) => removeRecord(req, res, "GET"),
}, {
  path: "/category",
  post: null,
  get: queryCategory
}]


http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    let endpoint = endpoints.find(e =>
      req.url.toLowerCase().includes(e.path))
    if (req.method === "POST" && endpoint.post != null) {
      endpoint.post(req, res)
    } else if (req.method === "GET" && endpoint.get != null) {
      endpoint.get(req, res)
    } else {
      res.statusCode = 405;
      res.end();
    }
  })
  .listen(8080);


function login(req, res) {
  genericPostBody(req, body => {
    let verified = false   //Placeholder
    if (verified) {
      let now = new Date()
      let token = {
        iat: now,
        exp: now.setHours(now.getHours() + process.env.TOKEN_EXPIRY)
      }
    }
  })
}

function signToken(head, body) {
  let s = crypto.createHmac('SHA256', process.env.SIGNING_SECRET)
    .update(head + '.' + body)
    .digest('base64')
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return s
}

function queryCategory(req, res) {
  var cat = url.parse(req.url).pathname.split('/').pop();
  if (cat === '') {
    res.end(JSON.stringify(getCategories()))
  } else {
    let records = getCategory(cat)
    res.end(JSON.stringify(records));
  }
}

function dumpDB(req, res) {
  res.end(JSON.stringify(recordsDB))
}


function genericPostBody(req, onEnd) {
  let body = '';
  req.on("data", chunk => { body += chunk; })
  req.on("end", a => { onEnd(body) })
}

function removeRecord(req, res, method) {
  if (method === "POST") {
    genericPostBody(req, body => {
      res.write(body);
      delEntry(body);
      res.end();
    })
  } else {
    var id = url.parse(req.url).pathname.split('/').pop();
    delEntry(id)
    res.end();
  }
}

function addRecord(req, res) {
  let body = '';
  genericPostBody(req, body => {
    res.write(body);
    let added = processAddRecord(body);
    if (!added)
      res.statusCode = 409
    else
      res.statusCode = 201
    res.end();
  })
}


function getCategory(category) {
  return recordsDB.database.filter(record => record.type === category)
}

function getCategories() {
  return categoryDB
}


function getBySerial(serial) {
  return recordsDB.database.filter(r => r.serial === serial)
}

function serialExists(serial) {
  return getBySerial(serial).length > 0
}

function processAddRecord(data) {
  let js = JSON.parse(data);
  js.serial = js.serial.trim()
  if (serialExists(js.serial)) return false
  var cNum = recordsDB.database.length;
  cNum = crypto.createHash('md5').update(js.serial).digest('hex');
  //Remove slice if longer control number is desired
  js.ctrl = cNum.toString().slice(-10);
  recordsDB.database.push(js);
  fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
  return true
}




function delEntry(entryNum) {
  let newDB = recordsDB.database.filter(r => r.ctrl !== entryNum)
  if (newDB.length < recordsDB.database.length) {
    recordsDB.database = newDB
    fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
    return true
  }
  else return false
}
