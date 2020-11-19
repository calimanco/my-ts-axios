const atob = require('atob')

function registerSimpleRouter(router) {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter(router) {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter(router) {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter(router) {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })
}

function registerInterceptorRouter(router) {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello')
  })
}

function registerConfigRouter(router) {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter(router) {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(res.body)
    }, 1000)
  })
}

function registerMorelRouter(router) {
  router.get('/more/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/more/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })

  router.post('/more/post', function(req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Yee' && password === '123456') {
      res.json(req.body)
    } else {
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function(req, res) {
    res.status(304)
    res.end()
  })
  
}

module.exports = {
  registerSimpleRouter,
  registerBaseRouter,
  registerErrorRouter,
  registerExtendRouter,
  registerInterceptorRouter,
  registerConfigRouter,
  registerCancelRouter,
  registerMorelRouter
}