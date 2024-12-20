import React, { useEffect, useState } from "react";
import "./customtable.css";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

function Customtable(props) {
  const { editClicked, expensesList, deleteClicked } = props;
  const [tableList, setTableList] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTableList(expensesList);
  }, [expensesList]);

  useEffect(() => {
    if (searchText) {
      searchinList();
    } else {
      setTableList(expensesList);
    }
  }, [searchText]);

  function searchinList() {
    const searchList = tableList?.filter((item) => {
      return (
        moment(item.date)
          .format("DD MMM YYYY")
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.amount
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setTableList(searchList);
  }

  return (
    <div className="tableDiv">
      <div className="search">
        <IoIosSearch />
        <input
          className="sInp"
          placeholder="Search....."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
      </div>
      {tableList?.length === 0 ? (
        <>
          <p className="noRecord">No Records Found</p>
        </>
      ) : (
        <table>
          <thead className="tableHeader">
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableList?.map((item) => (
              <tr>
                <td>{moment(item.date).format("DD MMM YYYY")}</td>
                <td>{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>
                  <div className="actionDiv">
                    <FaRegEdit
                      className="edit"
                      onClick={() => editClicked(item)}
                    />
                    <MdDelete
                      className="edit"
                      onClick={() => deleteClicked(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customtable;
