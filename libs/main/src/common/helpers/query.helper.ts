export const getSortColumns = (sort) => {
  const orderBy = {};
  const orderColumns = sort.split(',');
  orderColumns.map((item) => {
    const column = item.split('|');
    orderBy[column[0]] = column[1];
  });

  return orderBy;
};
