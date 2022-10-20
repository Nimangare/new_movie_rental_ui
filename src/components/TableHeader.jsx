const TableHeader = ({ columns, onSort, sortColumn }) => {
  const raiseSort = (column) => {
    let newSortColumn = { ...sortColumn };
    if (sortColumn.path === column.path) {
      if (sortColumn.order === 1) {
        newSortColumn.order = -1;
      } else {
        newSortColumn.order = 1;
      }
    } else {
      newSortColumn.path = column.path;
      newSortColumn.order = 1;
    }
    onSort(newSortColumn);
  };

  const displaySortIcon = (column) => {
    if (sortColumn.path !== column.path) return null;
    return sortColumn.order === 1 ? (
      <i className="fa-solid fa-sort-up"></i>
    ) : (
      <i className="fa-solid fa-sort-down"></i>
    );
  };
  return (
    <thead className="bg-light shadow-sm">
      <tr className="text-center">
        {columns.map((c) => (
          <th
            className="ps-4"
            key={c.path || c.key}
            onClick={() => raiseSort(c)}
            style={{ cursor: "pointer" }}
          >
            {c.header || c.key}
            {"      "} {displaySortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
