const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');
const logtimeRouter = require('./modules/logtime')

function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', projectRouter);
  app.use('/logtime', logtimeRouter)
}
module.exports = route;