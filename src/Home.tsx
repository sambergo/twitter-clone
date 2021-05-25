import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FilledInput,
  Grid,
  Input,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import FlareIcon from "@material-ui/icons/Flare";
import tweets from "./MOCK_DATA.json";
import Tweet from "./Tweet";
import { navlinks } from "./navlinks";
import { Button1, Button2 } from "./Buttons";
import SearchIcon from "@material-ui/icons/Search";

interface HomeProps {}

const useStyles = makeStyles(() => ({
  tweetinput: {
    width: "100%",
  },
  mainheader: {
    marginBlock: 20,
  },
  navbutton: {
    background: "transparent",
    fontSize: "25px",
    borderRadius: 30,
    paddingInline: 20,
    // marginBlock: 5,
    "&:hover": {
      color: "#1da1f2",
    },
  },
}));

const Home: React.FC<HomeProps> = ({}) => {
  const classes = useStyles();

  const navLink = (obj: { icon: JSX.Element; text: string; link: string }) => {
    const { icon, text, link } = obj;
    return (
      <Link underline="none" href={link} color="inherit">
        <Box display="flex" alignItems="center" className={classes.navbutton}>
          <Box>{icon}</Box>
          <Box display={{ md: "none", xs: "none", lg: "block" }} marginLeft={2}>
            <Typography>{text}</Typography>
          </Box>
        </Box>
        {/* <Button className={classes.navbutton} startIcon={icon}>
          <Box display={{ md: "none", xs: "none", lg: "block" }}>{text}</Box>
        </Button> */}
      </Link>
    );
  };

  const Main = () => {
    return (
      <Grid md={8} lg={6} xs={10} item container direction="column">
        <Box borderRight={1} borderLeft={1} borderColor="gray">
          <Grid
            alignContent="space-between"
            item
            container
            className={classes.mainheader}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              paddingX={2}
            >
              <Box>
                <Typography variant="h6">Etusivu</Typography>
              </Box>
              <Box>
                <FlareIcon color="primary" />
              </Box>
            </Box>
          </Grid>
          <Box border={1} marginBottom={2} borderColor="gray" paddingY={4}>
            <Grid item container>
              <Grid xs={1} item>
                <Box padding={2}>
                  <Avatar alt="avatar" src="/img/avatar.png" />
                </Box>
              </Grid>
              <Grid xs={10} item>
                <Box padding={2}>
                  <Box>
                    <Input
                      disableUnderline
                      placeholder="Mitä tapahtuu?"
                      className={classes.tweetinput}
                    />
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Button>Twittaa</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid item container>
            {tweets.map((tweet) => (
              <Tweet {...tweet} />
            ))}
          </Grid>
        </Box>
      </Grid>
    );
  };

  const Right = () => {
    return (
      <Box display={{ xs: "none", md: "block" }}>
        <Grid item container alignItems="center" direction="column">
          <Grid item>
            <FilledInput
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder="Hae Twitteristä"
              style={{
                width: "90%",
                marginInline: "5%",
                borderRadius: 30,
                marginTop: 10,
              }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container>
      <Grid container direction="row">
        <Box marginLeft={1}>
          <Grid xs={1} lg={3} item container direction="column">
            {navlinks.map((d) => navLink(d))}
          </Grid>
        </Box>
        <Main />
        <Grid item container md={3} xs={1}>
          <Right />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
