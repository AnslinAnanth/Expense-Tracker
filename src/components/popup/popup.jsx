import React, { useState } from 'react'
import './popup.css'
import { MdOutlineCancel } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";


function Popup(props) {

  const { categories, cancelBtnClicked, date, setDate,updateClicked, transaction,setTransaction, catego, setCatego, amount, setAmount, addBtnClicked } = props
  const[isNew,setIsNew]=useState(amount === '' ?? true)
  function onChangeValue(event) {
    setTransaction(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div className='mainPop'>
      <div className='popUp'>
        <div className='leftPop'>
          <div className='popTitle'>
            <p>Add new Budget</p>

          </div>
          {/* <input className='inpDate' type='date' value={date} onChange={(event)=>setDate(event.target.value)}/> */}
          <select className='category' value={catego} onChange={(event) => setCatego(event.target.value)}>
            <option>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input className='inpAmount' placeholder='Amount' type='number' value={amount} onChange={(event) => setAmount(event.target.value)} />
          <div className='inpt' onChange={onChangeValue}>
            <div className='inpCredit'>
            <input  type='radio' value='Credit' name='Type' checked={transaction === 'Credit'}/> Credit
            </div>
            <div className='inpCredit'>
            <input type='radio' value='Debit' name='Type' checked={transaction === 'Debit'}/> Debit
            </div>
            <div className='inpCredit'>
            <input type='radio' value='Savings' name='Type' checked={transaction === 'Savings'}/> Savings
          </div>

          </div>
          <div className='addrupdate'>
         {isNew ? <p className='addBtn' onClick={addBtnClicked}>Add</p> : <p className='update' onClick={updateClicked}>Update </p>}
          </div>
        </div>
        <div className='day'>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            // footer={
              // date ? `Selected: ${date.toLocaleDateString()}` : " "}
            className='dayy'
          />
          <MdOutlineCancel className='popIcon' onClick={cancelBtnClicked} />
        </div>
      </div>
    </div>
  )
}

export default Popup