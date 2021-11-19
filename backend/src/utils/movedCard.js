const Task = require('../app/models/Task')

exports.addANode = function (listTasks, idTask, moveBefore, moveAfter) {
    for (let task of listTasks) {
        if (moveBefore && JSON.stringify(task._id) == JSON.stringify(moveBefore)) {
            Task.findByIdAndUpdate(task._id, { 'moved.after': idTask }).then((result) => {
                return result
            })
        }
        if (moveAfter && JSON.stringify(task._id) == JSON.stringify(moveAfter)) {
            Task.findByIdAndUpdate(task._id, { 'moved.before': idTask }).then((result) => {
                return result
            })
        }
    }
}

exports.dropANode = function (listTasks, idTask) {
    let taskBeforeNew = null;
    let taskAfterNew = null;
    for (let task of listTasks) {
        if (task.moved.before == idTask) {
            taskAfterNew = task;
        }
        if (task.moved.after == idTask) {
            taskBeforeNew = task;
        }
    }
    if (taskBeforeNew) {
        if (taskAfterNew) {
            Task.findByIdAndUpdate(taskBeforeNew._id, {
                'moved.after': taskAfterNew._id,
            }).then((result) => {
                return result
            })
        } else {
            Task.findByIdAndUpdate(taskBeforeNew._id, {
                'moved.after': null,
            }).then((result) => {
                return result
            })
        }
    }
    if (taskAfterNew) {
        if (taskBeforeNew) {
            Task.findByIdAndUpdate(taskAfterNew._id, {
                'moved.before': taskBeforeNew._id,
            }).then((result) => {
                return result
            })
        } else {
            Task.findByIdAndUpdate(taskAfterNew._id, {
                'moved.before': null,
            }).then((result) => {
                return result
            })
        }
    }
}