import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from "react-leaflet";
import './mymap.css';
import "leaflet/dist/leaflet.css";
import type { TimelineObjects } from '../types/mapData';
import ShowTimeLineMap from "./TimeLineMap";
import MapControls from "./MapControls";
import dayjs from 'dayjs';
import ShowDateTime from "../mainpage/ShowDateTime";
import { RoundedButton } from "../utils/common/RoundedButton";
const baseUrl = import.meta.env.BASE_URL;


interface propsstype {
  timeLineObjects: TimelineObjects;
  mapDate: Date;
  setUserSelectedDate: (date: Date) => {}
}

function MyMap({ timeLineObjects = [], mapDate = new Date(), setUserSelectedDate }: propstype) {

  const [mapPlaying, setMapPlaying] = useState(false);


  function handleMapPlay(state: boolean) {
    setMapPlaying(state);
  }



  const childRef = useRef(null);

  const mapControl = (state: "back" | "forward") => {

    const childFunction = childRef ? childRef.current.mapControl : null;
    if (childFunction) {
      childFunction(state);
    } else {
      console.error('Child function not available.');
    }
  };

  const map_date = dayjs(mapDate);
  const account_deleted_date = dayjs("06-21-2024");
  return (
    <div className="map_wrap relative flex flex-col w-100">
      <div className="absolute top-0 z-50 mt-2 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0">
        <ShowDateTime date={mapDate} setUserSelectedDate={setUserSelectedDate} />
      </div>
      {timeLineObjects.length == 0 ? map_date.isAfter(account_deleted_date) ?
        <div className="flex flex-col p-5 mt-12">
          <div className="flex flex-none flex-col">
            <img className="h-3/5 flex-none flex-grow-0 grow-0" src={baseUrl + "/images/account_deleted.png"} />
            <div>
              Dar gayi kahi aur kuch malum na pade isliye delete kar diya account par isko malum nhi tha data pahale hi aa chuka mere pass.
            </div>
          </div>
        </div>
        :
        <div className="flex flex-col p-5 mt-12">
          <div className="flex flex-none flex-col">
            {/* <img className="h-3/5 flex-none flex-grow-0 grow-0" src={baseUrl+"/images/account_deleted.png"}/>
              <div>
                Dar gayi kahi aur kuch malum na pade isliye delete kar diya account par isko malum nhi tha data pahale hi aa chuka mere pass.
              </div> */}
            <h2 className="text-2xl text-center mb-3">Location not recorded by Google.</h2>
            <h3 className="text-xl text-center">Google ne location record nhi ki.</h3>
            <RoundedButton onClick={() => { location.reload() }}>
              Home
            </RoundedButton>
          </div>
        </div>
        :
        <>
          <ShowTimeLineMap timeLineObjects={timeLineObjects} mapPlaying={mapPlaying} ref={childRef} />
          <MapControls handleMapPlay={handleMapPlay} mapControl={mapControl} />
        </>
      }
    </div>
  );
}

export default MyMap;

export const getFormatedDate = (date: any) => {
  return dayjs(date).format('DD MMM YYYY');
}
