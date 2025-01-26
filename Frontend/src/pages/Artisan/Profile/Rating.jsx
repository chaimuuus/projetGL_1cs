import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating }) {
    // Parse the rating as a number
    const numericRating = parseFloat(rating);
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (numericRating >= i) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (numericRating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-gray-400" />);
        }
    }
    return <div className="flex space-x-1">{stars}</div>;
}

export default Rating;