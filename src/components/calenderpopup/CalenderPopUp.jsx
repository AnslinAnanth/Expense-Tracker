import React, { useState } from "react";
import { MdArrowDropDownCircle } from "react-icons/md";
import "./CalenderPopUp.css";
import { DayPicker } from "react-day-picker";

function CalenderPopUp(props) {
  const { date, setDate, onFilterClicked } = props;
  const [showCalender, setShowCalender] = useState(false);

  function displayCalender() {
    setShowCalender(!showCalender);
  }

  function onFilterButtonClicked() {
    onFilterClicked();
    setShowCalender(false);
  }

  return (
    <div className="mainCC">
      <div className="select" onClick={displayCalender}>
        <p>Filter by Date</p>
        <MdArrowDropDownCircle />
      </div>
      {showCalender && (
        <div className="calenderContainer">
          <DayPicker mode="range" selected={date} onSelect={setDate} />
          <div className="filterBtn" onClick={onFilterButtonClicked}>
            <p>Filter</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalenderPopUp;
