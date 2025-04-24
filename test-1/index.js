require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const HelperModule = require('./helper')
const PORT = 3000 || process.env.PORT

const app = express()

app.use(bodyParser.json())

app.post('/secret', (req, res) => {
    const secret = req.body?.secret

    if(!secret) {
        return res.status(400).json({ status: 'No secret provided' })
    }

    const hashValue = atob(secret)
    const json = { secret }

    fs.writeFileSync(path.resolve(`./tmp/${hashValue}.json`), JSON.stringify(json))

    const secretURL = HelperModule.buildSecretURL(hashValue)

    res.status(200).json({ secretURL })
})

app.get('/secret', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.listen(PORT, () => console.log(`Live on ${PORT}`))