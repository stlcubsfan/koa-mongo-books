const koa = require('koa'),
  router = require('koa-router')(),
  routes = require('./routes')

const app = koa();

router.get('/books', routes.list);
router.get('/books/:id', routes.one);
router.post('/books', routes.create);
router.put('/books/:id', routes.update);
router.del('/books/:id', routes.delete);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
