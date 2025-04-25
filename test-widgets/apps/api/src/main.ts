import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as Routes from './routes'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' })
})

Routes.createContactRoutes(app)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
