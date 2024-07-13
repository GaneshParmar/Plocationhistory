const baseUrl = import.meta.env.BASE_URL;
// // // mapDate.ts
// // // type placeLocation = {
// // //     latitudeE7 : number,
// // //     longitudeE7 : number,
// // //     name : string,
// // //     address? :string
// // // }

// // // type placeVisitDuration = {
// // //     startTimestamp : string,
// // //     endTimestamp : string
// // // }

// // // type activityType = "IN_SUBWAY" | "IN_BUS" | "IN_PASSENGER_VEHICLE" | "MOTORCYCLING" | "IN_TRAIN" | "FLYING" | "WALKING" | "CYCLING"

// // // type LatLongE7 = {
// // //     latitudeE7 : number,
// // //     longitudeE7 : number,
// // // }

// // // type transitStop = placeLocation;

// // // type transitPath = {
// // //     transitStops : transitStop[]
// // // }

// // // export type activitySegment = {
// // //     startLocation : LatLongE7,
// // //     endLocation : LatLongE7,
// // //     duration : placeVisitDuration,
// // //     distance : number,
// // //     activityType : activityType,
// // //     transitPath : transitPath
// // // }

// // // export type placeVisit = {
// // //     location : placeLocation,
// // //     duration : placeVisitDuration
// // // }

// // // type timeLineObject = {
// // //     activitySegment? : activitySegment,
// // //     placeVisit? : placeVisit;
// // // }

// // // export type TimelineObjects = timeLineObject[]

// // import { TimelineObjects } from "../../types/mapData";

// // const getTimeLineObjects=(user_selected_date: Date):TimelineObjects=>{

// //     let userTimeLineObjects = [];

// //     // Complete this function which returns the timelineobjects
// //     //  So basically i have my timelineobjects data in files
// //     //  so i have folder of years
// //     //  like 2024 , 2023 , etc
// //     //  and these folders i have files of particular month data
// //     //  like 2024_APRIL.json , 2024_FEBRUARY.json, etc
// //     //  and these files i have
// //     // {"timelineObjects": []}
// //     //  but they are full means date wise all the month data are there in sequence  
// //     //  but i want those data only whose date is user has selected
// //     // 
// //     // So my approach is to first select the folder based on the year of user_selected_date
// //     // then select the file based on user selected date
// //     // then in the file use binary search 
// //     // note that the data in the files are sorted


// //     return [];
// // }

// import { timeLineObject } from '../../types/mapData';
// import { getFormatedDate } from '../mapcontrols/MyMap';


// const  greaterThanUserSelectedDate=(timeline : timeLineObject, user_selected_date:Date)=>{

// }

// const getTimeLineObjects = async (user_selected_date:Date) => {
//     const year = user_selected_date.getFullYear();
//     const month = user_selected_date.toLocaleString('default', { month: 'long' }).toUpperCase();

//     const fileUrl = `/data/${year}/${year}_${month}.json`;

//     let timelineObjects : any = [];

//     try {
//         const response = await fetch(fileUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();

//         const formattedUserDate = getFormatedDate(user_selected_date);

//         // timelineObjects = jsonData.timelineObjects.filter((obj) => {
//         //     const dateToCheck = obj.activitySegment 
//         //         ? getFormatedDate(new Date(obj.activitySegment.duration.startTimestamp)) 
//         //         : getFormatedDate(new Date(obj.placeVisit.duration.startTimestamp));
            
//         //     return dateToCheck === formattedUserDate;
//         // });
//         const timeline_length = jsonData.timelineObjects.length;
//         const timelineobjects = jsonData.timelineObjects;
//         let left_pointer = 0;
//         let right_pointer = timeline_length - 1;

//         while(left_pointer<right_pointer){
//             let mid = (left_pointer + right_pointer) / 2;

//             if(greaterThanUserSelectedDate(timelineobjects[mid],user_selected_date)){
//                 right_pointer = mid;
//             }else{
//                 left_pointer = mid;
//             }
//         }

//         // for (let index = 0; index < timeline_length; index++) { 
//         // }

//     } catch (error) {
//         console.error(`Error loading timeline data for ${user_selected_date}:`, error);
//     }

//     return timelineObjects;
// }

// export default getTimeLineObjects;


import { TimelineObjects, timeLineObject } from '../../types/mapData';
import { getFormatedDate } from '../mapcontrols/MyMap';
import dayjs from 'dayjs';

const greaterThanUserSelectedDate = (timeline: timeLineObject, user_selected_date: Date) => {
    const userDate = dayjs(user_selected_date);
    const timelineDate = timeline.activitySegment 
        ? dayjs(timeline.activitySegment.duration.startTimestamp) 
        : dayjs(timeline.placeVisit?.duration.startTimestamp);

    return timelineDate.isAfter(userDate);
}

const getTimeLineObjects = async (user_selected_date: Date): Promise<TimelineObjects[]> => {
    const year = user_selected_date.getFullYear();
    const month = user_selected_date.toLocaleString('default', { month: 'long' }).toUpperCase();

    const fileUrl = `${baseUrl}data/${year}/${year}_${month}.json`;
    
    let timelineObjects: TimelineObjects[] = [];

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        const formattedUserDate = getFormatedDate(user_selected_date);

        const timeline_length = jsonData.timelineObjects.length;
        const timelineobjects = jsonData.timelineObjects;

        let left_pointer = 0;
        let right_pointer = timeline_length - 1;

        while (left_pointer < right_pointer) {
            let mid = Math.floor((left_pointer + right_pointer) / 2);

            if (greaterThanUserSelectedDate(timelineobjects[mid], user_selected_date)) {
                right_pointer = mid;
            } else {
                left_pointer = mid + 1;
            }
        }
        for (let i = left_pointer; i < timeline_length; i++) {
            const dateToCheck = timelineobjects[i].activitySegment 
                ? getFormatedDate(new Date(timelineobjects[i].activitySegment.duration.startTimestamp)) 
                : getFormatedDate(new Date(timelineobjects[i].placeVisit?.duration.startTimestamp));

            if (dateToCheck === formattedUserDate) {
                timelineObjects.push(timelineobjects[i]);
            } else {
                break;
            }
        }

    } catch (error) {
        console.error(`Error loading timeline data for ${user_selected_date}:`, error);
    }

    return timelineObjects;
}

export default getTimeLineObjects;
