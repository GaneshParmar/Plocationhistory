import { useState } from 'react'
import DateSelector from '../../mainpage/DateSelector';
import SelectHighlight from '../../mainpage/SelectHighlight';
import MyMap, { getFormatedDate } from '../../mapcontrols/MyMap'
import { RoundedButton } from '../../utils/common/RoundedButton';



function StoryBoardDateSelect({userSelectedDate, setUserSelectedDate,goToNextComponent}:{setUserSelectedDate:(date:Date)=>void,goToNextComponent:()=>{}}) {


    const [dateSelectorisMinimized, dateSelectorisMinimizedToggleMinimize] = useState(true);

    // const [userSelectedDate , setUserSelectedDate] = useState<Date>(new Date("06-05-2024"));

    function handleSelectDate(date: Date, goToNextComponentFlag : boolean = false){
        // setUserSelectedDate(date);
        setUserSelectedDate(date)
        if(goToNextComponentFlag){
            goToNextComponent();
        }
    }
    return (
        
        <>
            <div className='grid grid-cols-2 md:grid-cols-2 p-3' style={{height : "100vh"}}>
                <span className='col-span-2 flex justify-center align-middle md:h-full flex-col md:col-span-1'>
                    <span className="font-extrabold text-3xl text-center block my-2 visible md:hidden bg-blue-500 p-2 text-white">
                        Pooja Location History 
                    </span>
                    <span className="font-bold text-xl text-center block my-2 visible md:hidden">
                        <button onClick={()=>{{dateSelectorisMinimizedToggleMinimize(!dateSelectorisMinimized)}}} className="items-center gap-x-2 flex mx-auto align-middle rounded px-1 py-0 text-center m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
                            <div>
                                Custome Date Select
                            </div>
                            <i className={`fa ${dateSelectorisMinimized ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                        </button>
                    </span>
                    <div className={`overflow-hidden ${dateSelectorisMinimized?'h-0':'h-fit'} md:h-full flex flex-col justify-center`}>
                        <DateSelector handleSelectDate={handleSelectDate} userSelectedDate={userSelectedDate}/>
                        <div className='sticky bottom-0 text-center'>
                            <RoundedButton onClick={goToNextComponent} disabled={userSelectedDate==null} className=''>
                                {getFormatedDate(userSelectedDate)} ki
                                Location Dekhe
                            </RoundedButton>
                        </div>
                    </div>
                </span>
                <div className='md:hidden text-center block w-100 col-span-2 my-4 md:my-0 border-t pt-1'>
                    Upar tarrikh set kare ya niche chate hue highlight dekhe
                </div>
                <span className='col-span-2 md:col-span-1 overflow-y-auto '>
                    <SelectHighlight handleSelectDate={handleSelectDate} userSelectedDate={userSelectedDate}/>
                </span>
            </div>
        </>
    )
}

export default StoryBoardDateSelect