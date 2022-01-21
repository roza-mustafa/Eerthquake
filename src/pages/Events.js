import { Fragment, useState, useEffect, useContext } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";

import EventsList from "../components/EventsList";
import useFetch from "../hooks/useFetch";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const mapContext = useContext(MapContext);
  const { isLoading, fetchData } = useFetch();
  const isEventsEmpty = events.length <= 0;
  let history = useHistory();

  
  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate) {
      
      const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query");
      const params = {
        format: "geojson",
        starttime: mapContext.startDate,
        
        minlatitude: mapContext.bounds.minLatitude,
        maxlatitude: mapContext.bounds.maxLatitude,
        minlongitude: mapContext.bounds.minLongitude,
        maxlongitude: mapContext.bounds.maxLongitude,
        orderby: "time",
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      // sending the request
      console.log("sending request...", url);
      fetchData(url).then((data) => {
        setEvents(data);
      });
    }
  }, [fetchData, mapContext.bounds, mapContext.startDate]);

  const showEventDetail = (event) => {
    console.log("show event detail", event);
    history.push(`/events/${event.id}`);
  };

  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Events List</h1>
        
      </div>
      <div className={styles["section-one"]}>
        <Card title="Events List">
          <ul>
            <li className={styles["form-control"]}>
              <label> Start date:</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                value={mapContext.startDate}
                onChange={mapContext.updateStartDate}
              />
            </li>
           
          </ul>

          {isEventsEmpty && !isLoading && "There's no events to show."}
          {isLoading && "Loading Data..."}
          {!isEventsEmpty && !isLoading && <EventsList events={events} />}
        </Card>
      </div>
      
    </Fragment>
  );
}

export default Events;
