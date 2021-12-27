import Vue from 'vue';
import store from '../store/modules/auth';
export function sort(list) {
  const result = list.sort(function (a, b) {
    if (a.moved.before === null) {
      return -1;
    }
    if (a.moved.after === b._id) {
      return -1;
    }
    return 1;
  });
  return result;
}

export function showTime(startTime) {
  var start = new Date(startTime);
  var timeInMiliseconds = new Date() - start;
  this.timeReport.hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
  this.timeReport.minutes = Math.floor(
    (timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60,
  );
  this.timeReport.seconds = Math.floor(
    ((timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60 -
      this.timeReport.minutes) *
      60,
  );
}

export function decodeToken() {
  const token = localStorage.getItem('token');
  let user = Vue.$jwt.decode(token, process.env.VUE_APP_TOKEN_SECRET);
  if (!user) {
    localStorage.clear();
  }
  return user;
}

export function sortLeaderProjects(projects) {
  let listProject = projects.filter(
    (project) => project.createdBy._id === store.state.userInfo._id,
  );
  return listProject;
}
export function sortMemberProjects(projects) {
  let listProject = projects.filter(
    (project) => project.createdBy._id !== store.state.userInfo._id,
  );
  return listProject;
}
