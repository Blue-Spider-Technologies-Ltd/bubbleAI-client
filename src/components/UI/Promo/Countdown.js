import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount
    }, []);

    function calculateTimeLeft() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
        const difference = midnight - now; // Difference in milliseconds

        if (difference <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }



    return (
        <div style={styles.container}>
            <div style={styles.containerInner}>
                <div style={styles.items}>{String(timeLeft.hours).padStart(2, '0')} <div style={styles.timerHand}>HR</div></div>
                <div style={styles.separator}> : </div>
                <div style={styles.items}>{String(timeLeft.minutes).padStart(2, '0')} <div style={styles.timerHand}>MIN</div></div>
                <div style={styles.separator}> : </div>
                <div style={styles.items}>{String(timeLeft.seconds).padStart(2, '0')} <div style={styles.timerHand}>SEC</div></div>
            </div>            
        </div>
    );
};

export default CountdownTimer;


const styles = {
    container: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },        
    containerInner: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    items: {
        boxSizing: 'border-box',
        width: '8rem',
        height: '8rem',
        backgroundColor: '#3E8F93',
        boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.5)', 
        borderRadius: '20px',
        color: 'rgb(169, 28, 28)',
        fontSize: '3rem',
        fontWeight: '800', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    timerHand: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#c0d1d457',
        position: 'absolute',
        top: '.8rem',

    },
    separator: {
        fontSize: '3rem',
        fontWeight: '800', 
        color: 'black',
        margin: '0 10px'
    }
}