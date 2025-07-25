import React from 'react';
import { FaStar } from "react-icons/fa";

const Ratings = ({ amount }) => {
    const stars = [];

    for (let i = 0; i < amount; i++) {
        stars.push(<FaStar key={i} color="gold" />);
    }

    return <div>{stars}</div>;
};

export default Ratings;