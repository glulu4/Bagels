import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

function Timer() {

    // eslint-disable-next-line
    const [dayTime, setDayTime] = useState('time');
    // eslint-disable-next-line
    const [hourTime, setHourTime] = useState('time');
    // eslint-disable-next-line
    const [minTime, setMinTime] = useState('time');
    // eslint-disable-next-line
    const [secTime, setSecTime] = useState('time');

    useEffect(() => {
        const timer = setInterval(() => {
            let currDate = new Date();
            let daysUntilMonday = 1 + (7 - currDate.getDay()) % 7; // (3 + (7 - currDate.getDay() ) ) % 7;
            let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
            let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds

            let days = Math.floor(timeUntilMonday / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeUntilMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeUntilMonday % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeUntilMonday % (1000 * 60)) / 1000);


            // let daysUntilTuesday = (2 + (7 - currDate.getDay())) % 7;
            // let nextTuesday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilTuesday);
            // let timeUntilTuesday = nextTuesday - currDate; // gives time in milliseconds


            // let days = Math.floor(timeUntilTuesday / (1000 * 60 * 60 * 24));
            // let hours = Math.floor((timeUntilTuesday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // let minutes = Math.floor((timeUntilTuesday % (1000 * 60 * 60)) / (1000 * 60));
            // let seconds = Math.floor((timeUntilTuesday % (1000 * 60)) / 1000);

            


            setDayTime(days);
            setHourTime(hours);
            setMinTime(minutes);
            setSecTime(seconds);




        }, 1000);

        return () => {
            clearInterval(timer);
        };

    }, []);

    return (
        <section className={styles.timersection}>
            <div>
                {/* <h2 id={styles.timelabel}>Time until next bake</h2> */}
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    paddingRight:'10%'
                }}>
                    <h2 id={styles.timelabel}>Wednesday Noon @</h2>
                    <h3 id={styles.timelabel}>The Cozy Corner Bookstore</h3>
                    <h3 style={{fontWeight:'200'}} id={styles.timelabel}>5879 Ellsworth ave</h3>
                </div>


                {/* <div className={styles.countdown}>
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
                </div> */}
            </div>
        </section>

    );
}

export default Timer;
