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
      var start = new Date(startTime)
      var timeInMiliseconds = new Date() - start;
      this.timeReport.hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
      this.timeReport.minutes = Math.floor(
        (timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60
      );
      this.timeReport.seconds = Math.floor(
        ((timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60 -
          this.timeReport.minutes) *
          60
      );
      console.log(timeInMiliseconds);
}

