const authRouter = require('./modules/auth');
const projectRouter = require('./modules/project');
const logtimeRouter = require('./modules/logtime');
const user = require('./modules/user');
const chat = require('./modules/chat');
const room = require('./modules/room');
const notification = require('./modules/notification');
const status = require('./modules/status');
const admin = require('./modules/admin');
const task = require('./modules/task');
const bg = require('./modules/background')


const auth = require('../middleware/jwt');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/project', auth, projectRouter);
  app.use('/logtime', auth, logtimeRouter);
  app.use('/user', user);
  app.use('/chat', auth, chat);
  app.use('/room', auth, room);
  app.use('/status', status);
  app.use('/task', task);
  app.use('/admin', admin);
  app.use('/notification', auth, notification);
  app.use('/bg', bg)
}
module.exports = route;
