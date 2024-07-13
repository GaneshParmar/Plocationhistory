type placeLocation = {
    latitudeE7 : number,
    longitudeE7 : number,
    name : string,
    address? :string
}

type placeVisitDuration = {
    startTimestamp : string,
    endTimestamp : string
}

type activityType = "IN_SUBWAY" | "IN_BUS" | "IN_PASSENGER_VEHICLE" | "MOTORCYCLING" | "IN_TRAIN" | "FLYING" | "WALKING" | "CYCLING"

type LatLongE7 = {
    latitudeE7 : number,
    longitudeE7 : number,
}

type transitStop = placeLocation;

type transitPath = {
    transitStops : transitStop[]
}

export type activitySegment = {
    startLocation : LatLongE7,
    endLocation : LatLongE7,
    duration : placeVisitDuration,
    distance : number,
    activityType : activityType,
    transitPath : transitPath
}

export type placeVisit = {
    location : placeLocation,
    duration : placeVisitDuration
}

export type timeLineObject = {
    activitySegment? : activitySegment,
    placeVisit? : placeVisit;
}

export type TimelineObjects = timeLineObject[]