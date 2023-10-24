export const getPaginationData = (
  currentPageNumber: number,
  pageCount: number,
) => {
  const prev = currentPageNumber > 1 ? currentPageNumber - 1 : null;
  const next = currentPageNumber < pageCount ? currentPageNumber + 1 : null;
  const items: (number | "...")[] = [];

  if (currentPageNumber === 1 && pageCount === 1) {
    const res = {
      current: currentPageNumber,
      prev: null,
      next: null,
      items: [1],
    };
    return res;
  }

  items.push(1);

  if (currentPageNumber > 3) {
    items.push("...");
  }

  const r1 = currentPageNumber - 1;
  const r2 = currentPageNumber + 1;

  for (let i = Math.max(r1, 2); i <= Math.min(pageCount, r2); i++) {
    items.push(i);
  }

  if (r2 < pageCount - 1) {
    items.push("...");
  }

  if (r2 < pageCount) {
    items.push(pageCount);
  }

  const res = {
    current: currentPageNumber,
    prev: prev,
    next: next,
    items: items,
  };
  return res;
};
