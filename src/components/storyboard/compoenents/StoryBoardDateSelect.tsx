import { useState } from 'react'
import DateSelector from '../../mainpage/DateSelector';
import SelectHighlight from '../../mainpage/SelectHighlight';
import MyMap, { getFormatedDate } from '../../mapcontrols/MyMap'
import { RoundedButton } from '../../utils/common/RoundedButton';



function StoryBoardDateSelect({userSelectedDate, setUserSelectedDate,goToNextComponent}:{setUserSelectedDate:(date:Date)=>void,goToNextComponent:()=>{}}) {

    // const [userSelectedDate , setUserSelectedDate] = useState<Date>(new Date("06-05-2024"));

    function handleSelectDate(date: Date){
        // setUserSelectedDate(date);
        setUserSelectedDate(date)
    }
    return (
        
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 p-3' style={{height : "100vh"}}>
                <span className='col-span-2 flex justify-center align-middle '>
                    <DateSelector handleSelectDate={handleSelectDate} userSelectedDate={userSelectedDate}/>
                </span>
                <div className='md:hidden text-center block w-100 col-span-2 my-4 md:my-0'>
                    Upar tarrikh set kare ya niche chate hue highlight dekhe
                </div>
                <span className='col-span-2 md:col-span-1 overflow-y-auto '>
                    <SelectHighlight handleSelectDate={handleSelectDate} userSelectedDate={userSelectedDate}/>
                    <div className='sticky bottom-0 text-center'>
                        <RoundedButton onClick={goToNextComponent} disabled={userSelectedDate==null} className=''>
                            {getFormatedDate(userSelectedDate)} ki
                            Location Dekhe
                        </RoundedButton>
                    </div>
                </span>
            </div>
        </>
    )
}

export default StoryBoardDateSelect