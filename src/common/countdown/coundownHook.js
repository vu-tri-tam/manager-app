import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

// Random component
const Completionist = () => <span>You are good to go!</span>;
export default function CoundownHook({ hours, minutes, response }) {

    // const [state, setState] = useState()
    const converTimeToSecons = (hours, minutes) => {

        return ((3600 * hours) + (60 * minutes)) * 1000

    }
    // console.log(state,'state');
    // useEffect(() => {
    //     setState((new Date(response.startAt).getTime() + converTimeToSecons(hours, minutes)))
    // }, [])

    const renderer = ({ hours, minutes, seconds, completed }) => {

        if (completed) {
            // Render a completed state

            return <Completionist />;
        } else {
            // Render a countdown
            // console.log(hours, minutes, seconds, 'rerender');
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    // console.log((new Date(response.startAt).getTime() + converTimeToSecons(hours, minutes)), '5656');
    // console.log((new Date(response.startAt).getTime() + converTimeToSecons(hours, minutes)), '5656');
    return (
        <Countdown
            date={(new Date(response.startAt).getTime() + converTimeToSecons(hours, minutes))}
            renderer={renderer}
        >
        </Countdown>
    )
}
