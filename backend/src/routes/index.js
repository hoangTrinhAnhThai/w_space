const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');
const logtimeRouter = require('./modules/logtime');
const user = require('./modules/user');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', projectRouter);
  app.use('/logtime', logtimeRouter);
  app.use('/user', user);
}
module.exports = route;
