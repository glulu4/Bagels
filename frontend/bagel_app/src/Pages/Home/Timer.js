import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

function Timer() {

    const [dayTime, setDayTime] = useState('time');
    const [hourTime, setHourTime] = useState('time');
    const [minTime, setMinTime] = useState('time');
    const [secTime, setSecTime] = useState('time');

    useEffect(() => {
        const timer = setInterval(() => {
            let currDate = new Date();
            let daysUntilMonday = 1 + ((7 - currDate.getDay()) % 7);
            let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
            let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds

            let days = Math.floor(timeUntilMonday / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeUntilMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeUntilMonday % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeUntilMonday % (1000 * 60)) / 1000);

            setDayTime(days);
            setHourTime(hours);
            setMinTime(minutes);
            setSecTime(seconds);


            // timeUntilMonday = 0;  


            if ( timeUntilMonday <= 0 ){

                fetch("http://127.0.0.1:5001/send-orders", {
                    method: "post",
                    headers: { "Content-Type": "application/json; charset=UTF-8" }, //"Content-Type: application/json"
                    body: JSON.stringify({}),
                })
                .then( (response) => {
                    if ( response.ok ){
                        return response.json()
                    }
                    else{
                        throw new Error("Error: " + response.status);
                    }
                })
                .then( (data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                })
            }

        }, 1000);

        return () => {
            clearInterval(timer);
        };

    }, []);

    return (
        <section className={styles.timersection}>
            <div>
                <h2 id={styles.timelabel}>Time until next bake</h2>
                <div className={styles.countdown}>
                    <div className={styles.dayDiv}>
                        <h3 id="day-time">{dayTime}</h3>
                        <h3 className='labels'>Days</h3>
                    </div>
                    <div className={styles.hourDiv}>
                        <h3 id="hour-time">{hourTime}</h3>
                        <h3 className='labels'>Hours</h3>
                    </div>
                    <div className={styles.minDiv}>
                        <h3 id="min-time">{minTime}</h3>
                        <h3 className='labels'>Minutes</h3>
                    </div>
                    <div className={styles.secDiv}>
                        <h3 id="sec-time">{secTime}</h3>
                        <h3 className='labels'>Seconds</h3>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Timer;
