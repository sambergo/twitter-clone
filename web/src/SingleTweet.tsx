import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Tweet } from "./generated/graphql";

interface SingleTweetProps {
  tweet: Tweet;
}

const SingleTweet: React.FC<SingleTweetProps> = ({ tweet }) => {
  return (
    <Container>
      <Grid container direction="row"></Grid>
    </Container>
  );
};
export default SingleTweet;
