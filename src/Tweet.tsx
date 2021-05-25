import { Avatar, Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";

interface TweetProps {
  avatar: string;
  fullname: string;
  username: string;
  time: string;
  tweet: string;
  likes: number;
  comments: number;
  retweets: number;
}

const Tweet: React.FC<TweetProps> = ({
  avatar,
  fullname,
  username,
  time,
  tweet,
  likes,
  comments,
  retweets,
}) => {
  return (
    <Box border={1} borderColor="gray" padding={3}>
      <Grid item container>
        <Grid item xs={1}>
          <Avatar src={avatar} alt="avatar" />
        </Grid>
        <Grid spacing={1} xs={11} item container direction="column">
          <Grid item container>
            <Typography style={{ fontWeight: "bold" }} variant="body1">
              {fullname}{" "}
            </Typography>
            <Typography
              style={{ marginLeft: "20px" }}
              variant="body1"
            >{` @${username}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{tweet}</Typography>
          </Grid>
          <Grid spacing={9} direction="row" item container>
            <Grid item>
              <Box display="flex">
                <ChatBubbleOutlineOutlinedIcon />
                <Typography style={{ marginLeft: "10px" }} variant="body2">
                  {comments}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex">
                <RepeatOutlinedIcon />
                <Typography style={{ marginLeft: "10px" }} variant="body2">
                  {retweets}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex">
                <FavoriteBorderOutlinedIcon />
                <Typography style={{ marginLeft: "10px" }} variant="body2">
                  {likes}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <PublishOutlinedIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Tweet;
