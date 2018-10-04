export const transformTree = list => {
  if (!list || !list.length) {
    return [];
  }

  return list.map(obj => {
    return {
      label: obj.name,
      value: obj.id,
      key: obj.id,
      children: transformTree(obj.children),
    };
  });
};

export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
