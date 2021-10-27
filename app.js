const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const qrcode = require('qrcode');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/scan', (req, res) => {
    let inputValue = req.body.text;
    qrcode.toDataURL(inputValue, (err, url) => {
        if (err) {
            console.log(err)
        } else {
            res.render('scan', {
                qr_code: url
            })
        }
    })
})

app.listen(port, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server running on port ' + port)
    }
})