const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');
const logtimeRouter = require('./modules/logtime');
const user = require('./modules/user');
const chat = require('./modules/chat')
const room = require('./modules/room')
const status = require('./modules/status')
const auth = require('../middleware/jwt')


function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', auth,  projectRouter);
  app.use('/logtime', auth, logtimeRouter);
  app.use('/user', user);
  app.use('/chat', auth, chat)
  app.use('/room', auth, room)
  app.use('/status', status)

}
module.exports = route;
