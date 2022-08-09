getSubmissions(
  { formId: 'aXecHjmbATuF6iGFmvBLBX', query: { end: { $gte: '2020-11-20' } } },
  state => {
    console.log(state.data);
    return state;
  }
);
