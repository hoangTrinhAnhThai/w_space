const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');
const logtimeRouter = require('./modules/logtime');
const user = require('./modules/user');
const chat = require('./modules/chat')
const room = require('./modules/room')


function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', projectRouter);
  app.use('/logtime', logtimeRouter);
  app.use('/user', user);
  app.use('/chat', chat)
  app.use('/room', room)

}
module.exports = route;
