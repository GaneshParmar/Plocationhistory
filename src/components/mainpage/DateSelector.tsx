import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DateSelector({handleSelectDate,userSelectedDate}:{handleSelectDate:(date:Date)=>void,userSelectedDate : Date}) {
  
  return (
    <div className=" h-fit m-auto">
        <span className="font-extrabold text-3xl text-center my-2 hidden md:block">
          Select Date  
        </span>
        <div className="text-center border shadow-lg block rounded-md overflow-hidden">
          <Calendar date={userSelectedDate}  onChange={handleSelectDate} />
        </div>
    </div>
  )
}

export default DateSelector