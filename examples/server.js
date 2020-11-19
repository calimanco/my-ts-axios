const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multiparty = require('connect-multiparty')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const routerMap = require('./router')
const { pathMatch } = require('webpack-hot-middleware/helpers')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(multiparty({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

const router = express.Router()

Object.keys(routerMap).forEach(key => {
  routerMap[key](router)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
