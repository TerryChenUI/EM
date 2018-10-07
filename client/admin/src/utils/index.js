export const transformTree = list => {
  if (!list || !list.length) {
    return [];
  }

  return list.map(obj => {
    return {
      title: obj.name,
      value: obj._id,
      key: obj.id,
      children: transformTree(obj.children),
    };
  });
};

export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
