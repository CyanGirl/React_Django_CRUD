import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import ReviewList from "./ReviewList";
import Header from "./Header";

const Home = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <ReviewList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
