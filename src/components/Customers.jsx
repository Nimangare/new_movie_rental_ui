import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCustomer, getAllCustomers } from "../actions/customerAction";

const Customer = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };
  return (
    <React.Fragment>
      {/* <h2>customers</h2> */}
      <div className="row mt-4">
        <div className="col-3">
          <Link to="/customers/new">
            <button type="button" className="btn btn-primary m-5">
              Add Customer
            </button>
          </Link>
        </div>
        <div className="col pe-5">
          {customers.length < 1 ? (
            <p>customers is Empty</p>
          ) : (
            <table className="table table-bordered">
              <thead className="bg-light shadow-sm ">
                <tr className="text-center">
                  <th>Name</th>
                  <th>Phone</th>
                  <th>isGold</th>
                  <th>Remove customer</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {customers.map((customer, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: `/customers/${customer._id}`,
                          }}
                        >
                          <button className="btn">{customer.name}</button>
                        </Link>
                      </td>
                      <td>{customer.phone}</td>
                      <td>
                        {customer.isGold
                          ? "true"
                          : // <i className="fa-duotone fa-ring-diamond"></i>
                            "false"}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(customer._id)}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Customer;
