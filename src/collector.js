var http = require('http');
var fs = require('fs');
var dbFile = process.cwd() + '/src/fake-data.json'


var db = initdb()

var data = '';
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let body = '';
    req.on('data', (chunk) => { body += chunk })
    req.on('end', a => {
        res.write(body);
        someThing(body);
        res.end();
    })
}).listen(8080);

function someThing(data) {
    js = JSON.parse(data)
    var cNum = db.database.length;
    js.ctrl_num = cNum + 1;
    db.database.push(js)
    fs.writeFileSync(dbFile,JSON.stringify(db),'utf8')
}


function initdb() {
    var raw = ''
    if (fs.existsSync(dbFile)) {
        var raw = fs.readFileSync(dbFile, 'utf8')
    }
    
    if (raw === '') {
        raw = {
            "database":[]
        }
    }
    return (typeof raw === 'string') ? JSON.parse(raw) : raw
}