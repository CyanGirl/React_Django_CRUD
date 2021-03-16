import React, { useState, useEffect, Fragment, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { modeContext } from "./context";

import axios from "axios";

import { API_URL } from "../constants";

const NewReviewForm = ({ create, review }) => {
  //states
  const [pk, setPk] = useState(0);
  const [book_name, setBook_name] = useState("");
  const [author, setAuthor] = useState("");
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState("");
  const [modal, setModal] = useState(false);

  const [mode, setMode] = useContext(modeContext);

  useEffect(() => {
    if (review) {
      setPk(review.pk);
      setBook_name(review.book_name);
      setRatings(review.ratings);
      setReviews(review.reviews);
      setAuthor(review.author);
    }
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const editReview = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + pk, {
        pk: pk,
        book_name: book_name,
        author: author,
        ratings: ratings,
        reviews: reviews,
      })
      .then(() => {
        toggle();
        setMode(!mode);
      });
  };

  const createReview = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, {
        book_name: book_name,
        author: author,
        ratings: ratings,
        reviews: reviews,
      })
      .then(() => {
        toggle();
        setMode(!mode);
      });
  };

  const button = create ? "New Review" : "Edit";

  const title = create ? "Create New Review" : "Edit Review";

  const handleAuthor = (e) => {
    e.preventDefault();
    setAuthor(e.target.value);
  };

  const handleBook = (e) => {
    e.preventDefault();
    setBook_name(e.target.value);
  };

  const handleRatings = (e) => {
    e.preventDefault();
    setRatings(e.target.value);
  };

  const handleReviews = (e) => {
    e.preventDefault();
    setReviews(e.target.value);
  };

  //returning the HTML
  return (
    <Fragment>
      <Button width="200vw" onClick={toggle} color="primary">
        {console.log(button)}
        {button}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={create ? createReview : editReview}>
            <FormGroup>
              <Label for="book_name">Book Name :</Label>
              <Input
                type="text"
                name="book_name"
                onChange={handleBook}
                value={book_name}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author :</Label>
              <Input
                type="text"
                name="author"
                onChange={handleAuthor}
                value={author}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ratings">Ratings :</Label>
              <Input
                type="number"
                min="1"
                max="5"
                name="ratings"
                onChange={handleRatings}
                value={ratings}
                defaultValue="1"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="reviews">Reviews :</Label>
              <Input
                type="text"
                name="reviews"
                onChange={handleReviews}
                value={reviews}
                required
              />
            </FormGroup>
            <Button>Save</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default NewReviewForm;
