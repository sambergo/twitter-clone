import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
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
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import React from "react";
import { useProfileQuery } from "./generated/graphql";

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
  const { data } = useProfileQuery({ variables: { id: 2 } });
  if (!data) return <div>loading...</div>;
  return (
    <Grid md={8} lg={6} xs={10} item container direction="column">
      <Card style={{ width: "100%", backgroundColor: "black" }} square>
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
            <Box display="flex">{/* {data.profile.} */}</Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default Profile;
