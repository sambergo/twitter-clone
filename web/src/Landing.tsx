import { Box, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import { useHistory } from "react-router";
import { Button1, Button2 } from "./Buttons";
import { useMeQuery } from "./generated/graphql";
import SignUp from "./SignUp";

const useStyles = makeStyles(() => ({
  boxStyles: {
    backgroundImage: `url("img/twitter_left.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  rightFirst: {},
  rightSecond: {
    paddingTop: 45,
  },
  rightThird: {
    paddingTop: 45,
  },
  main: {
    height: "100vh",
  },
  bottom: {
    maxHeight: 300,
  },
  footer: {
    color: "grey",
    paddingLeft: 20,
    paddingBlock: 20,
    position: "sticky",
    bottom: 0,
    zIndex: 2000,
    backgroundColor: "black",
    height: 100,
  },
  stuff: {
    height: "calc(100vh - 100px)",
  },
}));

const Landing: React.FC = () => {
  const [signUpOpen, setsignupopen] = React.useState(false);
  const history = useHistory();
  const { data } = useMeQuery();
  if (data?.me?.id) history.push("/home");

  const handleClickOpen = () => {
    setsignupopen(true);
  };

  const handleClose = () => {
    setsignupopen(false);
  };
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {signUpOpen ? (
        <SignUp
          open={signUpOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      ) : null}
      <Grid className={classes.stuff} container direction="row-reverse">
        <Grid item container direction="column" xs={12} md={6}>
          <Box marginX="auto" marginY="auto">
            <Grid item className={classes.rightFirst}>
              {" "}
              <TwitterIcon fontSize="large" />
            </Grid>
            <Grid item>
              {" "}
              <Typography className={classes.rightSecond} variant="h2">
                Happening now{" "}
              </Typography>{" "}
            </Grid>
            <Grid item>
              <Typography className={classes.rightThird} variant="h4">
                Join Twitter today.
              </Typography>
            </Grid>
            <Grid item>
              <Button1 variant="contained" onClick={() => handleClickOpen()}>
                Sign up
              </Button1>
            </Grid>
            <Grid item>
              <Link href="/login">
                <Button2 variant="outlined">Log in</Button2>
              </Link>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} md={6} className={classes.boxStyles} item>
          <Box
            margin="auto"
            display="flex"
            justifyContent="center"
            height="100%"
          >
            <svg
              width="400px"
              fill="white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
          </Box>
        </Grid>
      </Grid>

      <Box className={classes.footer}>
        About Help Center Terms of Service Privacy Policy Cookie Policy Ads info
        Blog Status Careers Brand Resources Advertising Marketing Twitter for
        Business Developers Directory Settings © 2021 Twitter, Inc.
      </Box>
    </div>
  );
};
export default Landing;
