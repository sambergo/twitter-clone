import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import { unlink } from "fs";
import React from "react";
import { useLikeMutation, useUnLikeMutation } from "./generated/graphql";

interface TweetProps {
  avatar: string;
  fullname: string;
  username: string;
  createdAt: string;
  id: number;
  tweet: string;
  likedByUser: boolean;
  likesCount: number;
  commentsCount: number;
  retweets: number;
}

const Tweet: React.FC<TweetProps> = ({
  avatar,
  fullname,
  id: tweetId,
  username,
  createdAt,
  likedByUser,
  tweet,
  likesCount,
  commentsCount,
  retweets,
}) => {
  const [like] = useLikeMutation();
  const [unlike] = useUnLikeMutation();
  return (
    <Box width="100%" border={1} borderColor="gray" padding={3}>
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
                  {commentsCount}{" "}
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
                <Box
                  onClick={async () => {
                    {
                      likedByUser
                        ? await unlike({ variables: { tweetId } })
                        : await like({ variables: { tweetId } });
                    }
                  }}
                >
                  <FavoriteBorderOutlinedIcon
                  // color={likedByUser ? "primary" : "secondary"}
                  />
                </Box>
                <Typography style={{ marginLeft: "10px" }} variant="body2">
                  {likesCount}{" "}
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
