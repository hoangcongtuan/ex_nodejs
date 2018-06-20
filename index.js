var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
const  ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

//create application parser
var urlendcodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/process_get', (req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/json; charset=utf-8'
    // });
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

app.post('/process_post', urlendcodedParser, (req, res) => {
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }

    // res.writeHead(200, {
    //     'Content-Type': 'text/json; charset=utf-8'
    // });
    console.log(response)
    res.end(JSON.stringify(response))
})

app.get('/', (req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/json; charset=utf-8'
    // });s
    res.send('Hello GET')
})

app.post('/', (req, res) => {
  
    res.send('Hello POS')
})

app.delete('/delete_user', (req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/json; charset=utf-8'
    // });
    res.send('Delete User')
})

app.get('/list_user', (req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/json; charset=utf-8'
    // });
    res.send('Here is list user')
})

var server = app.listen(PORT, ip, () => {
    var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})