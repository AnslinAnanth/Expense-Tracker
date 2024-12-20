import React, { useEffect, useState } from "react";
import "./budget.css";
import Card from "../../components/card/card";
import { MdArrowDropDownCircle } from "react-icons/md";
import { MdOutlineTrackChanges } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Customtable from "../../components/customtable/customtable";
import Popup from "../../components/popup/popup";
import CustomLoader from "../../components/customLoader/CustomLoader";
import { formatIndianCurrency } from "../../utils/CurrencyFormatter";
import CalenderPopUp from "../../components/calenderpopup/CalenderPopUp";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { MdOutlineCancel } from "react-icons/md";

// let allExpenseResponse = {
//   "success": true,
//   "expenseList": [
//     {
//       "id": "475724945",
//       "date": "2024-12-02T18:30:00.000Z",
//       "amount": 5000,
//       "category": "Salary",
//       "type": "Credit"
//     },
//     {
//       "id": "67660189793",
//       "date": "2024-11-30T18:30:00.000Z",
//       "amount": 500,
//       "category": "Food",
//       "type": "Debit"
//     },
//     {
//       "id": "46313864821",
//       "date": "2024-11-05T18:30:00.000Z",
//       "amount": 500,
//       "category": "Salary",
//       "type": "Credit"
//     },
//     {
//       "id": "27078839853",
//       "date": "2024-12-09T18:30:00.000Z",
//       "amount": 500,
//       "category": "Travel",
//       "type": "Debit"
//     },
//     {
//       "id": "63889513148",
//       "date": "2024-12-10T18:30:00.000Z",
//       "amount": 500,
//       "category": "Food",
//       "type": "Debit"
//     }
//   ]
// }

function Budget() {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const categories = [
    "Food",
    "Travel",
    "Rent",
    "EB Bill",
    "Salary",
    "Allowance",
    "Petrol",
    "Groceries",
    "Cosmetics",
    "Others",
  ];
  const currentDate = new Date();
  let initialRange = {
    from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), //Starting date of this month
    to: currentDate, //today's date
  };
  const [expensesList, setExpensesList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [filterDate, setFilterDate] = useState();
  const [transaction, setTransaction] = useState("");
  const [catego, setCatego] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    try {
      getBudgetByRangeAPI(initialRange.from, initialRange.to);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    calculateTotalIncome();
    calculateTotalExpense();
    calculateTotalSavings();
  }, [expensesList]);

  const BASE_URL =
    "https://script.google.com/macros/s/AKfycbyqxOX0WRPPphrE79X9PnQnrTL0wTsS0GwBT59TEgtCoRAjwV0--AR2I8nObA2GjVZUPg/exec";

  async function getBudgetAPI() {
    setLoading(true);
    const url = `${BASE_URL}?action=getAllExpenses`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, "Result");
    // let list=JSON.parse(result)
    setExpensesList(result.expenseList);
    setLoading(false);
  }

  async function getBudgetByRangeAPI(fromDate, toDate) {
    setLoading(true);
    let startDate = fromDate;
    let endDate = toDate;
    const url = `${BASE_URL}?action=getExpensesByDateRange&startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, "Result");
    // let list=JSON.parse(result)
    setExpensesList(result.expenseList);
    setLoading(false);
  }

  async function postBudgetAPI(budget) {
    setLoading(true);
    const url = `${BASE_URL}?action=postExpense`;

    const response = await fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    if (response.ok) {
      getBudgetByRangeAPI(initialRange.from, initialRange.to);
      setIsVisible(false);
      toast("Added Successfully");
      setDate(new Date());
      setTransaction("");
      setCatego("");
      setAmount("");
    } else {
      console.log("Something went wrong");
    }
  }
  async function putBudgetApi(budget) {
    setLoading(true);
    const url = `${BASE_URL}?action=putExpense`;

    const response = await fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    if (response.ok) {
      getBudgetByRangeAPI(initialRange.from, initialRange.to);
      setIsVisible(false);
      toast("Updated Successfully");
      setDate(new Date());
      setTransaction("");
      setCatego("");
      setAmount("");
    } else {
      console.log("Something went wrong");
    }
  }

  async function deleteBudgetApi(budget) {
    setLoading(true);
    const url = `${BASE_URL}?action=deleteExpense`;

    const response = await fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    if (response.ok) {
      getBudgetByRangeAPI(initialRange.from, initialRange.to);
      toast("Deleted Successfully");
    } else {
      console.log("Something went wrong");
    }
  }

  function calculateTotalIncome() {
    let total = 0;
    expensesList.map((item) => {
      if (item.type === "Credit") {
        total = total + item.amount;
      }
    });
    setTotalIncome(total);
  }

  function calculateTotalExpense() {
    let total = 0;
    expensesList.map((item) => {
      if (item.type === "Debit") {
        total = total + item.amount;
      }
    });
    setTotalExpense(total);
  }
  function calculateTotalSavings() {
    let total = 0;
    expensesList.map((item) => {
      if (item.type === "Savings") {
        total = total + item.amount;
      }
      setTotalSavings(total);
    });
  }

  function onFilterClicked() {
    getBudgetByRangeAPI(filterDate.from, filterDate.to);
  }

  function addExpenseClicked() {
    console.log("clicked");
    setIsVisible(true);
  }
  function cancelBtnClicked() {
    setIsVisible(false);
  }
  function addBtnClicked() {
    let budget = {
      date: date,
      type: transaction,
      category: catego,
      amount: amount,
    };
    try {
      postBudgetAPI(budget);
    } catch (error) {
      console.error(error);
    }
    console.log(budget);
  }
  function editClicked(item) {
    console.log(item, "editedexpense");
    setIsVisible(true);
    setDate(item.date);
    setAmount(item.amount);
    setCatego(item.category);
    setTransaction(item.type);
    setId(item.id);
  }
  function updateClicked() {
    let budget = {
      id: id,
      date: date,
      type: transaction,
      category: catego,
      amount: amount,
    };
    console.log(budget);
    try {
      putBudgetApi(budget);
    } catch (error) {
      console.error(error);
    }
    setIsVisible(false);
    setDate(new Date());
    setTransaction("");
    setCatego("");
    setAmount("");
  }
  function deleteClicked(item) {
    let deletebudget = { id: item.id };
    console.log(deletebudget, "Clicked");
    try {
      deleteBudgetApi(deletebudget);
    } catch (error) {
      console.error(error);
    }
  }

  function onClearFilterClicked(){
    getBudgetByRangeAPI(initialRange.from, initialRange.to);
    setFilterDate()

  }

  return (
    <div className="mainContainer">
      <div className="mainText">
        <MdOutlineTrackChanges className="trackIcon" />
        <p> Expense Tracker</p>
      </div>
      <div className="selectAdd">
        <CalenderPopUp
          date={filterDate}
          setDate={setFilterDate}
          onFilterClicked={onFilterClicked}
        />
        {filterDate && (
          <div className="filteredDate">
            <p>{`${moment(filterDate.from).format("DD MMM YYYY")} - ${moment(
              filterDate.to
            ).format("DD MMM YYYY")}`}</p>
            <MdOutlineCancel onClick={onClearFilterClicked}/>
          </div>
        )}
        <div className="add" onClick={addExpenseClicked}>
          <p>Add Expense</p>
        </div>
      </div>

      <div className="cardGrp">
        <Card
          income="Total Income"
          amount={`₹ ${formatIndianCurrency(totalIncome.toString())}`}
        />
        <Card
          income="Total Expense"
          amount={`₹ ${formatIndianCurrency(totalExpense.toString())}`}
        />
        <Card
          income="Total Savings"
          amount={`₹ ${formatIndianCurrency(totalSavings.toString())}`}
        />
        {/* <Card
          income='Total Amount'
          amount='Rs.10,00,000' /> */}
      </div>
      <Customtable
        expensesList={expensesList}
        editClicked={editClicked}
        deleteClicked={deleteClicked}
      />
      {isVisible && (
        <div className="modal">
          <Popup
            categories={categories}
            cancelBtnClicked={cancelBtnClicked}
            addBtnClicked={addBtnClicked}
            date={date}
            setDate={setDate}
            transaction={transaction}
            setTransaction={setTransaction}
            catego={catego}
            setCatego={setCatego}
            amount={amount}
            setAmount={setAmount}
            updateClicked={updateClicked}
          />
        </div>
      )}
      {loading && (
        <div className="modal">
          <CustomLoader />
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default Budget;
