const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', projectRouter)
}
module.exports = route;