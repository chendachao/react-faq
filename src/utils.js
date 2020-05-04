export const isNode = (item) => {
  return item && !item.children;
};

export const hasActiveNode = (children) => {
  return children.some((child) => {
    if (isNode(child)) {
      return child.active === true;
    } else {
      return hasActiveNode(child.children);
    }
  });
};

// active/deactive item recursively
export const toggleActivity = (id, items, active /* default */) => {
  return items.reduce((acc, item) => {
    let newItem = item;
    if (item.id === id) {
      newItem = {
        ...item,
        active: !item.active || active,
      };
    } else if (item.children) {
      item.children = toggleActivity(id, item.children, active);
      const canActive = hasActiveNode(item.children);
      canActive && (item.active = canActive);
    }
    acc.push(newItem);
    return acc;
  }, []);
};

export const findNodeById = (id, nodes) => {
  const tempArr = [...nodes];
  while (tempArr.length > 0) {
    const item = tempArr.shift();
    if (item.id === id) {
      return item;
    } else if (item.children) {
      tempArr.push(...item.children);
    }
  }
  return null;
};

export function deepAssign(target, ...sources) {
  for (const source of sources) {
    for (const k in source) {
      const vs = source[k];
      const vt = target[k];
      if (Object(vs) === vs && Object(vt) === vt) {
        target[k] = deepAssign(vt, vs);
        continue;
      }
      target[k] = source[k];
    }
  }
  return target;
}
