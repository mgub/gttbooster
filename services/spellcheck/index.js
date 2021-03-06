'use strict'
/*global process __dirname*/

require('pmx').init({http: true, network: true, ports: true})

const pm2UserMetric = require('./middleware/pm2UserMetric')
const program = require('commander')

program
.option('-p, --port', 'Custom port number')
// Color here might cause unexpected behavior? But probably not. This is just added to avoid a complaint that '--color is not defined'
.option('-c, --color', 'Use colors')
.parse(process.argv)

const log = console.log

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const chalk = require('chalk')
const cors = require('./middleware/cors')
const logger = require('./middleware/logger')
const router = require('./router')

const PORT = program.port || require('./config').port

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
//app.use(firewall({exceptionIp: ['::ffff:10.0.0.3', '10.0.0.1']}))
app.use(pm2UserMetric({label: 'Session users'}))

// https://www.npmjs.com/package/morgan
// app.use(require('morgan')(':method :url :response-time'))

app.use(logger({storeDelay: 100 * 1000}))

console.log(new Date().toLocaleDateString())

/**
 * Set sub-folder /public as route /public
 */
router.use(express.static((__dirname || process.cwd()) + '/public'))

// All routes
app.use('/', router)

// Init
app.listen(PORT, () => {
    log(chalk.cyan.bold('Running Node Express filehoster on port ' + PORT))
})
