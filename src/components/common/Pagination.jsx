import _ from "underscore";
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pages = _.range(1, Math.ceil(itemsCount / pageSize) + 1);

  if (pages.length === 0) {
  }
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            key={index}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}{" "}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
