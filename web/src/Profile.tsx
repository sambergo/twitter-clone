import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import React from "react";
import { useProfileQuery } from "./generated/graphql";
import Tweet from "./Tweet";

interface ProfileProps {}

const useStyles = makeStyles(() => ({
  card: { width: "100%" },
  media: {
    height: 180,
  },
  large: {
    width: 150,
    height: 150,
    border: "4px solid black",
    bottom: 0,
    position: "relative",
    left: 12,
    top: 70,
    alignItems: "center",
  },
}));

const Profile: React.FC<ProfileProps> = ({}) => {
  const [nav, setNav] =
    React.useState<"tweets" | "replies" | "media" | "likes">("tweets");
  const { data } = useProfileQuery({ variables: { id: 1 } });
  console.log("data : ", data);
  if (!data) return <div>loading...</div>;
  const {
    createdAt,
    username,
    fullname,
    id,
    tweets,
    followers,
    following,
    dateOfBirth,
  } = data.profile!;

  return (
    <Grid md={8} lg={6} xs={10} item container direction="column">
      <Card
        style={{
          width: "100%",
          backgroundColor: "black",
        }}
        square
      >
        <CardMedia style={{ height: 170 }} image={"/img/twitter_left.png"}>
          <Avatar
            src={"/img/avatar.png"}
            style={{
              width: 145,
              height: 145,
              position: "relative",
              top: 90,
              left: 15,
              border: "4px solid black",
            }}
          />
        </CardMedia>
        <CardContent>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Box>
              <IconButton>
                <MoreHorizOutlinedIcon
                  style={{
                    color: "#1da1f2",
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <AddAlertOutlinedIcon
                  style={{
                    color: "#1da1f2",
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Box>
            <Box marginRight={2} display="flex" marginLeft={1}>
              <Button
                style={{ marginBlock: 10, paddingInline: 20, borderRadius: 30 }}
              >
                Follow
              </Button>
            </Box>
          </Box>
          <Box display={{ xs: "none", lg: "block" }} marginLeft={1}>
            <Typography style={{ fontSize: "15px" }}>
              {data.profile?.fullname}
            </Typography>
            <Typography style={{ fontSize: "10px" }}>
              @{data.profile?.username}
            </Typography>
            <Typography variant="body2" style={{ marginTop: 10 }}>
              Tempor non cillum aliqua do exercitation dolore dolor ea. Officia
              pariatur commodo ad eiusmod irure laboris. Et aliquip officia
              exercitation ipsum enim mollit ex nulla Lorem nisi est ipsum
              exercitation. Do ad aute laboris nulla reprehenderit. Anim commodo
              commodo ut exercitation id excepteur ullamco elit duis laboris.
            </Typography>
            <Box marginTop={2} display="flex">
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="caption" style={{ marginRight: 25 }}>
                {" "}
                Helsinki, Finland{" "}
              </Typography>
              <DateRangeOutlinedIcon fontSize="small" />
              <Typography variant="caption">
                {"Joined "}
                {new Date(
                  parseInt(data.profile?.createdAt ?? "0")
                ).toLocaleString("en-US", { month: "long", year: "numeric" })}
              </Typography>
            </Box>
            <Box marginTop={1} display="flex">
              <Typography>{following!.length ?? null}</Typography>
              <Typography style={{ marginLeft: 5, color: "gray" }}>
                Following
              </Typography>
              <Typography style={{ marginLeft: 25 }}>
                {followers!.length ?? null}
              </Typography>
              <Typography style={{ marginLeft: 5, color: "gray" }}>
                Followers
              </Typography>
            </Box>
            <Box
              paddingX={3}
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Box>Tweets</Box>
              <Box>Tweets & replies</Box>
              <Box>Media</Box>
              <Box>Likes</Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {tweets.map((tweet) => (
        <Tweet
          {...tweet}
          avatar={"/srx/avatar.png"}
          retweets={3}
          fullname={fullname}
          username={username}
        />
      ))}
    </Grid>
  );
};
export default Profile;
