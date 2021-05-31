import {
  Avatar,
  Box,
  Button,
  Container,
  FilledInput,
  Grid,
  Input,
  InputAdornment,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FlareIcon from "@material-ui/icons/Flare";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useFeedQuery } from "./generated/graphql";
// import tweets from "./MOCK_DATA.json";
import { navlinks } from "./navlinks";
import Tweet from "./Tweet";

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
  // const { data } = useMeQuery();
  const { data, loading } = useFeedQuery();
  console.log("data : ", loading, data);

  const navLink = (obj: { icon: JSX.Element; text: string; link: string }) => {
    const { icon, text, link } = obj;
    return (
      <Link key={text} underline="none" href={link} color="inherit">
        <Box
          margin={1}
          display="flex"
          alignItems="center"
          className={classes.navbutton}
        >
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
        <Box
          position="sticky"
          top={0}
          zIndex={1100}
          bgcolor="black"
          display="flex"
          justifyContent="space-between"
          width="100%"
          paddingX={2}
          paddingY={2}
          borderRight={1}
          borderLeft={1}
          borderBottom={1}
          borderColor="gray"
        >
          <Box>
            <Typography variant="h6">Home</Typography>
          </Box>
          <Box>
            <FlareIcon color="primary" />
          </Box>
        </Box>
        <Box borderRight={1} borderLeft={1} borderColor="gray">
          <Grid
            alignContent="space-between"
            item
            container
            className={classes.mainheader}
          ></Grid>
          <Box marginBottom={2} borderColor="gray">
            <Grid item container>
              <Grid xs={1} item>
                <Box paddingX={2}>
                  <Avatar alt="avatar" src="/img/avatar.png" />
                </Box>
              </Grid>
              <Grid xs={10} item>
                <Box paddingX={2}>
                  <Box>
                    <Input
                      disableUnderline
                      placeholder="What's happening?"
                      className={classes.tweetinput}
                    />
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Button>Tweet</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid item container>
            {data?.feed.tweets.map((tweet) => (
              <Tweet
                key={tweet.id}
                retweets={3}
                {...tweet}
                avatar={"/img/avatar.png"}
                {...tweet.creator}
              />
            ))}
          </Grid>
        </Box>
      </Grid>
    );
  };

  const Right = () => {
    return (
      <Grid item container md={3} xs={1}>
        <Box borderRight={3} display={{ xs: "none", lg: "block" }}>
          <Grid item container alignItems="center" direction="column">
            <Grid item>
              <FilledInput
                disableUnderline
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                placeholder="Search Twitter"
                style={{
                  width: "90%",
                  marginInline: "5%",
                  borderRadius: 30,
                  marginTop: 10,
                }}
              />
            </Grid>
            {/* <Grid item></Grid> */}
          </Grid>
        </Box>
      </Grid>
    );
  };

  const Left = () => {
    return (
      <Box
        position="sticky"
        top={0}
        height="100vh"
        alignContent="space-between"
        marginLeft={1}
      >
        <Grid xs={1} lg={3} item container direction="column">
          {navlinks.map((d) => navLink(d))}
        </Grid>
        <Box position="absolute" bottom={20} marginLeft={3} display="flex">
          <Avatar alt="avatar" src="/img/avatar.png" />
          <Box display={{ xs: "none", lg: "block" }} marginLeft={1}>
            <Typography style={{ fontSize: "15px" }}>
              {data?.feed.tweets[0].creator.fullname}{" "}
            </Typography>
            <Typography style={{ fontSize: "10px" }}>
              @{data?.feed.tweets[0].creator.username}{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Container>
      <Grid container direction="row">
        <Left />
        <Main />
        <Right />
      </Grid>
    </Container>
  );
};
export default Home;
