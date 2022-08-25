import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchReviewsOfCurrUser } from "../../store/reviews";
import ReviewsCard from "../ReviewsCard";



const CurrentUserReviewsShow = () => {

    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    const reviews = useSelector((state) => Object.values(state.reviews));

    //styling for reviews

    useEffect(() => {
        dispatch(fetchReviewsOfCurrUser())
        .then(() => setIsLoaded(true));
    }, [ dispatch ]);

    const reviewDisplay = reviews.map((review) => (
        <ReviewsCard key={review?.id} review={ review } />
    ))


    return  isLoaded && (
        <>
            {reviewDisplay}
        </>
    )

}

export default CurrentUserReviewsShow;
