import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { API_URL } from "../constants";
import RemoveReview from "./RemoveReview";
import NewReview from "./NewReview";
import { modeContext } from "./context";

const ReviewList = () => {
  const [reviewlist, setReviewlist] = useState(() => {
    axios.get(API_URL).then((result) => setReviewlist(result.data));
  });

  const [mode, setMode] = useContext(modeContext);

  useEffect(() => {
    axios.get(API_URL).then((result) => setReviewlist(result.data));
  }, [mode]);

  const loading = () => {
    if (reviewlist == []) {
      return "Loading....Please Wait....";
    } else {
      return "";
    }
  };

  return (
    <Fragment>
      <NewReview create={true} review={false} />
      <br />
      <br />
      <Table dark>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Ratings</th>
            <th>Reviews</th>
            <th>Published Date</th>
          </tr>
        </thead>

        <tbody>
          {!reviewlist || reviewlist.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Whhoopps! No reviews yet...</b>
              </td>
            </tr>
          ) : (
            reviewlist.map((review) => (
              <tr key={review.pk}>
                <td>{review.book_name}</td>
                <td>{review.author}</td>
                <td>{review.ratings}</td>
                <td>{review.reviews}</td>
                <td>{review.published_date}</td>
                <td align="center">
                  <NewReview create={false} review={review} />
                </td>
                <td align="center">
                  <RemoveReview pk={review.pk} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <br />
      <br />
    </Fragment>
  );
};

export default ReviewList;
