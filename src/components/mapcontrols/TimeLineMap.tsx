import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {  MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TimelineObjects } from '../types/mapData';
import dayjs from 'dayjs';

interface ShowTimeLineMapProps {
  timeLineObjects: TimelineObjects;
  mapPlaying: boolean;
}

const ShowTimeLineMap=forwardRef((props: ShowTimeLineMapProps, ref: Ref<any>) =>  {
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
  const mapControl = (state:"back"|"forward") => {
    if(state == "back"){
      setCurrentIndex(currentIndex-1);
    }else if(state == "forward"){
      setCurrentIndex(currentIndex+1);
    }else{
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

  return (
    <MapContainer center={mapCenter} zoom={12} style={{ height: "90%", maxHeight :"90dvh", width: "100%", zIndex : 20 }}>
      <UpdateCenter center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
            <Marker key={index} position={position}>
              <Tooltip permanent>
                <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
              </Tooltip>
            </Marker>
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
  );
})

export default ShowTimeLineMap;
