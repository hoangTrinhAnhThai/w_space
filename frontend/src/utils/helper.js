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
