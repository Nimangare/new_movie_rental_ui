const ListGroup = (props) => {
  const { genres, onItemChange, genre, textProp, valueProp } = props;

  return (
    <div>
      <ul className="list-group " style={{ cursor: "pointer" }}>
        <li
          className={
            genre === "" ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemChange("")}
        >
          All
        </li>
        {genres.map((g) => {
          return (
            <li
              className={
                genre === g[valueProp]
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={g[valueProp]}
              onClick={() => onItemChange(g[valueProp])}
            >
              {g[textProp]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id",
};

export default ListGroup;
