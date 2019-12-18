require('dotenv').config()
const http = require("http");
const fs = require("fs");
const url = require('url');
const crypto = require('crypto')
const express = require('express')

const baseDir = process.cwd() + '/data/'
const dbFile = baseDir + "fake-data.json";
const userDbFile = baseDir + "users.json"
const groupDbFile = baseDir + "groups.json"

var recordsDB = init(dbFile, { database: [] });
var usersDB = init(userDbFile, { users: [] });
var groupsDB = init(groupDbFile, { groups: [] });

const port = 8080
const app = express()

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


app.use(corsHeader)
app.use(authenticate)
app.post('/login', login)
app.get('/dump', dumpDB)
app.post('/add', addRecord)
app.get('/remove', (req, res) => removeRecord(req, res, "GET"))
app.post('/remove', (req, res) => removeRecord(req, res, "POST"))
app.get('/category', (req, res) => res.end(JSON.stringify(getCategories())))
app.get('/category/:category', (req, res) => res.end(JSON.stringify(getCategory(req.params.category))))
app.post('/edit', editRecord)

app.listen(port)


function corsHeader(req, res, next) {
  // res.setHeader("Content-Type", "application/json");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
}

function authenticate(req, res, next) {
  let authorized = true
  if (authorized) {
    next()
  } else {
    res.statusCode = 401
  }
}

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


function dumpDB(req, res) {
  res.end(JSON.stringify(recordsDB))
}


function genericPostBody(req, onEnd) {
  let body = '';
  req.on("data", chunk => { body += chunk; })
  req.on("end", a => { onEnd(body) })
}

function genericJSONBody(req, onEnd) {
  genericPostBody(req, (body) => onEnd(JSON.parse(body)))
}


function removeRecord(req, res, method) {
  if (method === "POST") {
    genericPostBody(req, body => {
      res.write(body);
      delEntry(body);
      res.end();
    })
  } else {
    var ctrl = url.parse(req.url).pathname.split('/').pop();
    delEntry(ctrl)
    res.end();
  }
}

function editRecord(req, res) {
  genericJSONBody(req, js => {
    res.write(JSON.stringify(js));
    delEntry(js.ctrl)
    processAddRecord(js)
    res.end();
  })
}

function addRecord(req, res) {
  genericJSONBody(req, js => {
    res.write(JSON.stringify(js));
    let added = processAddRecord(js);
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

function processAddRecord(js) {
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


function delEntry(ctrl) {
  let newDB = recordsDB.database.filter(r => r.ctrl !== ctrl)
  if (newDB.length < recordsDB.database.length) {
    recordsDB.database = newDB
    fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
    return true
  }
  else return false
}
