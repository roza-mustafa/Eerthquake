import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import styles from "./EventDetail.module.css";
import Card from "../components/Card";


function EventDetail() {
  
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  
  useEffect(() => {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=nc73677646`;
    
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
         
          setEvent(result);
          setDataIsLoaded(true);
        },
        (error) => {}
      );
  }, [eventId]);

  function getEventDateFormatted(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <Fragment>
      {dataIsLoaded && (
        <Fragment>
          <div className={styles.main}>
            <h1>Event Detail: {event.properties.title}</h1>
            <p>Event Date: {getEventDateFormatted(event.properties.time)}</p>
          </div>
          <div className={styles["section-one"]}>
            <Card title="Event Detail">
              <ul className={styles["event-description"]}>
                <li>
                  Magnitude:{" "}
                  <span
                    className={styles.value}
                  >{`${event.properties.mag} ${event.properties.magType}`}</span>
                </li>
                <li>
                  Depth:{" "}
                  <span
                    className={styles.value}
                  >{`${event.geometry.coordinates[2]} km`}</span>
                </li>
                <li>
                  
                  Significance:{" "}
                  <span className={styles.value}>
                    {event.properties.sig}
                    <span className={styles.significance}>/1000</span>

                  </span>
                </li>
               
               <li>
                latitude:{" "}
                  <span
                    className={styles.value}
                  >{` ${event.geometry.coordinates[1]}`}</span>

</li>

                 longitude:{" "}
               <span
                    className={styles.value}
                  >{` ${event.geometry.coordinates[0]}`}</span>

              
                
                 
                    
                
               
              </ul>
            </Card>
          </div>
          
        </Fragment>
      )}
      {!dataIsLoaded && (
        <div className={styles.main}>
          <h1>Loading data...</h1>
        </div>
      )}
    </Fragment>
  );
}

export default EventDetail;
