import React, { useState, useEffect } from 'react';
import MyMap, { getFormatedDate } from '../mapcontrols/MyMap';
import highlightData from '../mainpage/highlight.json';
import { TimelineObjects } from '../../types/mapData';
import getTimeLineObjects from './TimeLine';
import TimeLineHighlight from './TimeLineHighlight';
import AnimatedSequence from './compoenents/AnimationSequence';

interface propsType {
    userDate: Date | String
}

export default function LocationHighlight({ userDate = new Date("2024-06-05") }: propsType) {
    const [userSelectedDate, setUserSelectedDate] = useState<any>(userDate);
    const [highlights, setHighlights] = useState<any>([]);
    const [selectedHighlight, setSelectedHighlight] = useState<any>(null);
    const [timeLineObjects, setTimeLineObjects] = useState<TimelineObjects[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Load the highlights data from the JSON file
        setHighlights(highlightData.highlights);
    }, []);

    const getHighlight = (date: Date) => {
        return highlights.filter((h: any) => {
            let highlight_date = getFormatedDate(new Date(h.date));
            let user_formated_date = getFormatedDate(date);
            return highlight_date === user_formated_date;
        });
    }

    useEffect(() => {
        const highlight_for_userSelectedDate = getHighlight(userSelectedDate);

        if (highlight_for_userSelectedDate.length === 0) {
            setSelectedHighlight([{
                "name": "Location history",
                "date": getFormatedDate(userSelectedDate),
                "description": "",
                "images": []
            }]);
        } else {
            setSelectedHighlight(highlight_for_userSelectedDate);
        }
    }, [userSelectedDate, highlights]);

    useEffect(() => {
        const fetchTimelineObjects = async () => {
            setLoading(true);
            const timelineObjects = await getTimeLineObjects(userSelectedDate);
            setTimeLineObjects(timelineObjects);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };

        fetchTimelineObjects();
    }, [userSelectedDate]);

    const components = [
        { component: <TimeLineHighlight  userSelectedDate={userSelectedDate} selectedHighlight={selectedHighlight} goToNextComponent={()=>{}}/>, autoNext: false, hideControls: true },
        { component: <MyMap setUserSelectedDate={setUserSelectedDate} timeLineObjects={timeLineObjects} mapDate={userSelectedDate}  goToNextComponent={()=>{}} />, autoNext: false, hideControls: true },
        
        ];
    
    return (
        <div>
            {loading ? (
                // <div className="flex justify-center items-center">
                //     <div
                //         className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                //         role="status">
                //         <span
                //             className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                //         >Loading...</span>
                //     </div>
                // </div>
                <div className="relative flex justify-center items-center h-screen">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
                </div>
            ) : (
                <div>
                    <AnimatedSequence components={components}/>
                    {/* <TimeLineHighlight  userSelectedDate={userSelectedDate} selectedHighlight={selectedHighlight} /> */}
                    {/* <div className="mb-4">
                        {JSON.stringify(selectedHighlight)}
                    </div> */}
                    {/* <div>
                        <MyMap timeLineObjects={timeLineObjects} mapDate={userSelectedDate}/>
                    </div> */}
                </div>
            )
            }
        </div >
    );
}
