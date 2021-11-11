let tasks = [
  {
    _id: '1',
    name: 'task 1',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e159b6fc472025217718',
    moved: {
      before: '2',
      after: '3',
    },
  },
  {
    _id: '2',
    name: 'task 2',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e159b6fc472025217718',
    moved: {
      before: null,
      after: '1',
    },
  },
  {
    _id: '3',
    name: 'task 3',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e159b6fc472025217718',
    moved: {
      before: '1',
      after: '4',
    },
  },
  {
    _id: '4',
    name: 'task 4',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e159b6fc472025217718',
    moved: {
      before: '3',
      after: null,
    },
  },
  {
    _id: '5',
    name: 'task 5',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e164b6fc47202521771a',
    moved: {
      before: '6',
      after: null,
    },
  },
  {
    _id: '6',
    name: 'task 6',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e164b6fc47202521771a',
    moved: {
      before: null,
      after: '5',
    },
  },
  {
    _id: '8',
    name: 'task 8',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: 1,
    statusId: '6188e16cb6fc47202521771c',
    moved: {
      before: null,
      after: '9',
    },
  },
  {
    _id: '9',
    name: 'task 9',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e16cb6fc47202521771c',
    moved: {
      before: '8',
      after: null,
    },
  },
  {
    _id: '10',
    name: 'task 10',
    description:
      'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
    projectId: '1',
    statusId: '6188e173b6fc47202521771e',
    moved: {
      before: null,
      after: null,
    },
  },
  // {
  //   _id: '11',
  //   name: 'task 11',
  //   description:
  //     'nhất, là bất kỳ tác phẩm nào bằng văn bản. Hiểu theo nghĩa hẹp hơn, thì văn học là dạng văn bản được coi là một hình thức nghệ thuật, ',
  //   projectId: '1',
  //   statusId: '6188e173b6fc47202521771e',
  //   moved: {
  //     before: null,
  //     after: '1'
  //   }
  // },
];
const status = [
  {
    _id: '6188e159b6fc472025217718',
    name: 'Open',
    v: 0,
  },
  {
    _id: '6188e164b6fc47202521771a',
    name: 'Inprogress',
    v: 0,
  },
  {
    _id: '6188e16cb6fc47202521771c',
    name: 'Resolved',
    __v: 0,
  },
  {
    _id: '6188e173b6fc47202521771e',
    name: 'Closed',
    __v: 0,
  },
];
export default {
  tasks,
  status,
};
