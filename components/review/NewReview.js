import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
  newReview,
  checkReviewAvailability,
  clearErrors,
} from '../../redux/actions/roomActions';
import { NEW_REVIEW_RESET } from '../../redux/constants/roomConstants';

const NewReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const { success, error } = useSelector(state => state.newReview);
  const { reviewAvailable } = useSelector(state => state.checkReview);

  const { id } = router.query;

  useEffect(() => {
    // check if user made a booking. If so they can leave a review
    if (id !== undefined) {
      dispatch(checkReviewAvailability(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Review has been posted.');
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, success, error, id]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };

    console.log(reviewData);

    dispatch(newReview(reviewData));
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, i) => {
      star.starValue = i + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, i) => {
        if (e.type === 'click') {
          if (i < this.starValue) {
            star.classList.add('red');

            setRating(this.starValue);
          } else {
            star.classList.remove('red');
          }
        }
        if (e.type === 'mouseover') {
          if (i < this.starValue) {
            star.classList.add('light-red');

            setRating(this.starValue);
          } else {
            star.classList.remove('light-red');
          }
        }
        if (e.type === 'mouseout') {
          star.classList.remove('light-red');
        }
      });
    }
  }

  return (
    <>
      {reviewAvailable && (
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4 mb-5"
          data-toggle="modal"
          data-target="#ratingModal"
          onClick={setUserRatings}
        >
          Submit Your Review
        </button>
      )}

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>

              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
