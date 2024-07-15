// import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { TimelineObjects } from '../types/mapData';
// import dayjs from 'dayjs';
// const baseUrl = import.meta.env.BASE_URL;

// interface ShowTimeLineMapProps {
//   timeLineObjects: TimelineObjects;
//   mapPlaying: boolean;
// }

// const ShowTimeLineMap = forwardRef((props: ShowTimeLineMapProps, ref: Ref<any>) => {
//   const initialCenter = [19.20283, 72.88261];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [mapCenter, setMapCenter] = useState(initialCenter);
//   let mapPlaying = props.mapPlaying;
//   let timeLineObjects = props.timeLineObjects;

//   const UpdateCenter = ({ center }: { center: number[] }) => {
//     const map = useMap();
//     map.setView(center);
//     return null;
//   };

//   const mapControl = (state: "back" | "forward") => {
//     if (state === "back") {
//       setCurrentIndex(currentIndex - 1);
//     } else if (state === "forward") {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       alert("Unhandled map control.");
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     mapControl: mapControl
//   }));

//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (mapPlaying && currentIndex < timeLineObjects.length) {
//       timer = setTimeout(() => {
//         const currentObject = timeLineObjects[currentIndex];
//         if (currentObject?.placeVisit) {
//           const { latitudeE7, longitudeE7 } = currentObject.placeVisit.location;
//           setMapCenter([latitudeE7 / 1e7, longitudeE7 / 1e7]);
//         } else if (currentObject?.activitySegment) {
//           const { startLocation } = currentObject.activitySegment;
//           setMapCenter([startLocation.latitudeE7 / 1e7, startLocation.longitudeE7 / 1e7]);
//         }
//         setCurrentIndex(currentIndex + 1);
//       }, 1000); // Change the duration to control the speed of the animation
//     }

//     return () => clearTimeout(timer);
//   }, [currentIndex, timeLineObjects, mapPlaying]);

//   const createIcon = (iconUrl) => {
//     return L.icon({
//       iconUrl,
//       iconSize: [44, 44],
//       iconAnchor: [16, 32],
//       popupAnchor: [0, -32]
//     });
//   };

//   const FrequentlyVisitedLocations = [
//     {
//       "name": "Sasra Kandivali",
//       "location": {
//         "latitudeE7": 192111958,
//         "longitudeE7": 728743141,
//       },
//       "marker": baseUrl + "/images/markers/sasara_.png"
//     },
//     {
//       "name": "Piyar Santosh Nagar",
//       "location": {
//         "latitudeE7": 191690380,
//         "longitudeE7": 728755010,
//       },
//       "marker": baseUrl + "/images/markers/piyar_.png"
//     },
//     {
//       "name": "New Office",
//       "location": {
//         "latitudeE7": 191235394,
//         "longitudeE7": 728547182,
//       },
//       "marker": baseUrl + "/images/markers/office.png"
//     },
//     {
//       "name": "Old Office",
//       "location": {
//         "latitudeE7": 191172068,
//         "longitudeE7": 728562096,
//       },
//       "marker": baseUrl + "/images/markers/office.png"
//     },
//     {
//       "name": "Growels Mall Fake College",
//       "location": {
//         "latitudeE7": 192032519,
//         "longitudeE7": 728597148,
//       },
//       "marker": baseUrl + "/images/markers/mall.png"
//     },
//     {
//       "name": "College",
//       "location": {
//         "latitudeE7": 192139215,
//         "longitudeE7": 728652780,
//       },
//       "marker": baseUrl + "/images/markers/college.png"
//     },
//   ];

//   return (
//     <div className="relative h-full w-full">
//       <MapContainer center={mapCenter} zoom={12} style={{ height: "90%", maxHeight: "90dvh", width: "100%", zIndex: 20 }}>
//         <UpdateCenter center={mapCenter} />
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {FrequentlyVisitedLocations.map((location, index) => (
//           <Marker
//             key={index}
//             position={[location.location.latitudeE7 / 1e7, location.location.longitudeE7 / 1e7]}
//             icon={createIcon(location.marker)}
//           >
//             <Popup>{location.name}</Popup>
//           </Marker>
//         ))}
//         {timeLineObjects.slice(0, currentIndex).map((timeLineObject, index) => {
//           if (timeLineObject.placeVisit) {
//             const { duration } = timeLineObject.placeVisit;
//             const { latitudeE7, longitudeE7, name } = timeLineObject.placeVisit.location;
//             const position = [latitudeE7 / 1e7, longitudeE7 / 1e7];
//             const startTimestamp = dayjs(duration.startTimestamp);
//             const endTimestamp = dayjs(duration.endTimestamp);
//             const durationString = `${endTimestamp.diff(startTimestamp, 'hour')} hours, ${endTimestamp.diff(startTimestamp, 'minute') % 60} minutes`;

//             const tooltipContent = `
//               ${name || 'No name provided'}<br />
//               Start: ${startTimestamp.format('YYYY-MM-DD HH:mm')}<br />
//               End: ${endTimestamp.format('YYYY-MM-DD HH:mm')}<br />
//               Duration: ${durationString}
//             `;

//             return (
//               <Marker key={index} position={position}>
//                 <Tooltip permanent={currentIndex === index}>
//                   <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
//                 </Tooltip>
//               </Marker>
//             );
//           } else if (timeLineObject.activitySegment) {
//             const activity = timeLineObject.activitySegment;
//             const startposition = [activity.startLocation.latitudeE7 / 1e7, activity.startLocation.longitudeE7 / 1e7];
//             const endposition = [activity.endLocation.latitudeE7 / 1e7, activity.endLocation.longitudeE7 / 1e7];
//             const polyline = [startposition, endposition];
//             const limeOptions = { color: 'lime' };

//             return <Polyline key={index} pathOptions={limeOptions} positions={polyline} />;
//           }
//           return null;
//         })}
//       </MapContainer>
//       <LocationIndex
//         locations={FrequentlyVisitedLocations}
//         setMapCenter={setMapCenter}
//       />
//     </div>
//   );
// });
// const LocationIndex = ({ locations, setMapCenter }) => {
//   return (
//     <div className="absolute bottom-0 right-0 m-4 p-2 bg-white shadow-lg rounded-lg max-h-40 overflow-auto z-50">
//       <h3 className="text-lg font-bold mb-2">Locations</h3>
//       <ul>
//         {locations.map((location, index) => (
//           <li key={index}>
//             <button
//               onClick={() => setMapCenter([location.location.latitudeE7 / 1e7, location.location.longitudeE7 / 1e7])}
//               className="text-blue-500 hover:underline flex justify-center align-middle my-2 gap-2"
//             >
//               <img src={location.marker} width="20"/>
//               {location.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShowTimeLineMap;


import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TimelineObjects } from '../types/mapData';
import dayjs from 'dayjs';
const baseUrl = import.meta.env.BASE_URL;

interface ShowTimeLineMapProps {
  timeLineObjects: TimelineObjects;
  mapPlaying: boolean;
}

const ShowTimeLineMap = forwardRef((props: ShowTimeLineMapProps, ref: Ref<any>) => {
  const initialCenter = [19.20283, 72.88261];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  let mapPlaying = props.mapPlaying;
  let timeLineObjects = props.timeLineObjects;

  const UpdateCenter = ({ center }: { center: number[] }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  const mapControl = (state: "back" | "forward") => {
    if (state === "back") {
      setCurrentIndex(currentIndex - 1);
    } else if (state === "forward") {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Unhandled map control.");
    }
  };

  useImperativeHandle(ref, () => ({
    mapControl: mapControl
  }));

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (mapPlaying && currentIndex < timeLineObjects.length) {
      timer = setTimeout(() => {
        const currentObject = timeLineObjects[currentIndex];
        if (currentObject?.placeVisit) {
          const { latitudeE7, longitudeE7 } = currentObject.placeVisit.location;
          setMapCenter([latitudeE7 / 1e7, longitudeE7 / 1e7]);
        } else if (currentObject?.activitySegment) {
          const { startLocation } = currentObject.activitySegment;
          setMapCenter([startLocation.latitudeE7 / 1e7, startLocation.longitudeE7 / 1e7]);
        }
        setCurrentIndex(currentIndex + 1);
      }, 1000); // Change the duration to control the speed of the animation
    }

    return () => clearTimeout(timer);
  }, [currentIndex, timeLineObjects, mapPlaying]);

  useEffect(() => {

    if (currentIndex < timeLineObjects.length) {
      const currentObject = timeLineObjects[currentIndex];
      if (currentObject?.placeVisit) {
        const { latitudeE7, longitudeE7 } = currentObject.placeVisit.location;
        setMapCenter([latitudeE7 / 1e7, longitudeE7 / 1e7]);
      } else if (currentObject?.activitySegment) {
        const { startLocation } = currentObject.activitySegment;
        setMapCenter([startLocation.latitudeE7 / 1e7, startLocation.longitudeE7 / 1e7]);
      }
    }

  }, [currentIndex, timeLineObjects]);

  const createIcon = (iconUrl) => {
    return L.icon({
      iconUrl,
      iconSize: [44, 44],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  const FrequentlyVisitedLocations = [
    {
      "name": "Sasra Kandivali",
      "location": {
        "latitudeE7": 192111958,
        "longitudeE7": 728743141,
      },
      "marker": baseUrl + "/images/markers/sasara_.png"
    },
    {
      "name": "Piyar Santosh Nagar",
      "location": {
        "latitudeE7": 191690380,
        "longitudeE7": 728755010,
      },
      "marker": baseUrl + "/images/markers/piyar_.png"
    },
    {
      "name": "New Office",
      "location": {
        "latitudeE7": 191235394,
        "longitudeE7": 728547182,
      },
      "marker": baseUrl + "/images/markers/office.png"
    },
    {
      "name": "Old Office",
      "location": {
        "latitudeE7": 191172068,
        "longitudeE7": 728562096,
      },
      "marker": baseUrl + "/images/markers/office.png"
    },
    {
      "name": "Growels Mall Fake College",
      "location": {
        "latitudeE7": 192032519,
        "longitudeE7": 728597148,
      },
      "marker": baseUrl + "/images/markers/mall.png"
    },
    {
      "name": "College",
      "location": {
        "latitudeE7": 192139215,
        "longitudeE7": 728652780,
      },
      "marker": baseUrl + "/images/markers/college.png"
    },
    {
      "name": "Barista Coffee",
      "location": {
        "latitudeE7": 191310477,
        "longitudeE7": 728138666,
      },
      "marker": baseUrl + "/images/markers/cafe.png"
    },
    {
      "name": "Hotel",
      "location": {
        "latitudeE7": 191378310,
        "longitudeE7": 728227534,
      },
      "marker": baseUrl + "/images/markers/hotel.png"
    },
  ];

  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div className="relative h-full w-full">
      <MapContainer center={mapCenter} zoom={12} style={{ height: "90%", maxHeight: "90dvh", width: "100%", zIndex: 20 }}>
        <UpdateCenter center={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isMinimized && FrequentlyVisitedLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.location.latitudeE7 / 1e7, location.location.longitudeE7 / 1e7]}
            icon={createIcon(location.marker)}
          >
            <Tooltip >
              {location.name}
            </Tooltip>
          </Marker>
        ))}
        {timeLineObjects.slice(0, currentIndex).map((timeLineObject, index) => {
          if (timeLineObject.placeVisit) {
            const { duration } = timeLineObject.placeVisit;
            const { latitudeE7, longitudeE7, name } = timeLineObject.placeVisit.location;
            const position = [latitudeE7 / 1e7, longitudeE7 / 1e7];
            const startTimestamp = dayjs(duration.startTimestamp);
            const endTimestamp = dayjs(duration.endTimestamp);
            const durationString = `${endTimestamp.diff(startTimestamp, 'hour')} hours, ${endTimestamp.diff(startTimestamp, 'minute') % 60} minutes`;

            const tooltipContent = `
              ${name || 'No name provided'}<br />
              Start: ${startTimestamp.format('YYYY-MM-DD HH:mm')}<br />
              End: ${endTimestamp.format('YYYY-MM-DD HH:mm')}<br />
              Duration: ${durationString}
            `;

            return (
              <>
                {currentIndex-1 == index &&
                  <div className="absolute top-20 left-0 m-4 p-2 bg-white shadow-lg rounded-lg max-h-40 overflow-auto " style={{zIndex: "99999"}}>
                    <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
                  </div>}
                <Marker key={index} position={position}>
                  <Tooltip >
                    <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
                  </Tooltip>
                </Marker>
              </>
            );
          } else if (timeLineObject.activitySegment) {
            const activity = timeLineObject.activitySegment;
            const startposition = [activity.startLocation.latitudeE7 / 1e7, activity.startLocation.longitudeE7 / 1e7];
            const endposition = [activity.endLocation.latitudeE7 / 1e7, activity.endLocation.longitudeE7 / 1e7];
            const polyline = [startposition, endposition];
            const limeOptions = { color: 'lime' };

            return <Polyline key={index} pathOptions={limeOptions} positions={polyline} />;
          }
          return null;
        })}
      </MapContainer>
      <LocationIndex
        locations={FrequentlyVisitedLocations}
        setMapCenter={setMapCenter}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
    </div>
  );
});

const LocationIndex = ({ locations, setMapCenter, isMinimized,setIsMinimized }) => {

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`absolute bottom-0 right-0 m-4 p-2 bg-white shadow-lg rounded-lg z-50 ${isMinimized ? 'h-12' : 'max-h-40 overflow-auto'}`}>
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-lg font-bold mb-2">Locations</h3>
        <button onClick={toggleMinimize} className="text-blue-500 hover:underline">
          <i className={`fa ${isMinimized ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
        </button>
      </div>
      {!isMinimized && (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              <button
                onClick={() => setMapCenter([location.location.latitudeE7 / 1e7, location.location.longitudeE7 / 1e7])}
                className="text-blue-500 hover:underline flex justify-center align-middle my-2 gap-2"
              >
                <img src={location.marker} width="20" alt={location.name} />
                {location.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default ShowTimeLineMap;
