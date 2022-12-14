import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deleteASpot, fetchSpotById } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import { fetchReviewBySpotId } from "../../store/reviews";
import ReviewFormModal from "../ReviewModal";
import ReviewsCard from "../ReviewsCard";
import "./SpotDetailCard.css"


const SpotDetailsCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ isLoaded, setIsLoaded ] = useState(false);

    let { spotId } = useParams();
    spotId = parseInt(spotId);

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const spots = useSelector((state) => state.spots);

    const spot = spots[spotId]
    let currentUser;

    if (sessionUser && spot) {
        if (sessionUser.id === spot.ownerId) {
            currentUser = true;
        }
        else currentUser = false;
    }

    useEffect(() => {
        dispatch(fetchSpotById(spotId)).then(() =>
        dispatch(fetchReviewBySpotId(spotId)))
        .then(() => setIsLoaded(true));
    }, [ dispatch, spotId ]);

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoaded(false)
        await dispatch(deleteASpot(spotId));
        history.push("/");
    };

    const reviewDisplay = reviews.map((review) => (
        <ReviewsCard key={ review?.id } review={ review } />
    ))

    return isLoaded && (
        <div className="big-ol-centered-div">
            <div className="title-picture-container">
            <div className="spot-detail-main">
                <div className="spot-detail-title-widget">
                    <div className="spot-name-text">{spot?.name}</div>
                    <div className="spot-detail-bar">
                        <div className="star-sharp"><i className="fa-solid fa-star"></i></div>
                        <div>{spot?.avgStarRating}</div>
                        <div>{spot?.numReviews} review(s)</div>
                        <div>{spot?.city}, {spot?.state}, {spot?.country}</div>
                    </div>
                </div>
                    { currentUser && (
                        <div className="edit-delete-container">
                            <EditSpotModal />
                            <div className="delete-button" onClick={(e) => handleDelete(e)}>Delete</div>
                        </div>
                        )
                    }
            </div>
                <div className="image-display-container">
                    { spot?.Images && (
                        <img className="display-image" src={spot?.Images[0]?.url} alt="Img Not Found"/>
                        )
                    }
                </div>
            </div>
            <div className="description-price-widget">
                <div className="description-spot-display overflow-field">{spot?.description}</div>
                <div className="price-and-reviews">
                    <div className="pr-baseline">
                        <div className="spot-detail-price">
                            <div className="sdp-text">${spot?.price}</div>
                            <div className="sdp-night">night</div>
                        </div>
                        <div className="spot-review-stars">
                            <div className="star-sharp"><i className="fa-solid fa-star"></i></div>
                            <div>{spot?.avgStarRating}</div>
                            <div className="padding">
                                <div>{spot?.numReviews} review(s)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { sessionUser && (
                    <div className="leave-review-container">
                        <ReviewFormModal />
                    </div>
                )
            }
            <div className="spots-reviews-header">
                <div className="star-sharp"><i className="fa-solid fa-star fa-xl"></i></div>
                <div className="srh-avgstar">{spot?.avgStarRating}</div>
                <div className="padding-bigger">
                    <div className="srh-numreviews">{spot?.numReviews} review(s)</div>
                </div>
            </div>
            <div className="spots-reviews-container overflow-reviews">
                {reviewDisplay}
            </div>
        </div>
    )
}

export default SpotDetailsCard;
