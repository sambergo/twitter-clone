import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Twitter } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button1 } from "./Buttons";
import { useHistory } from "react-router-dom";

interface LoginProps {}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    marginTop: 20,
  },
  header: {
    marginBlock: 20,
  },
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch", // borderColor: "gray",
    },
  },
  main: {
    marginInline: "auto",
    maxWidth: "400px",
  },
  teksti: {
    width: "350px",
    marginBlock: 10,
  },
  loginbtn: {
    // marginLeft: 30,
    // paddingLeft: 30,
    marginTop: 30,
    background: "#1da1f2",
    borderRadius: 30,
    color: "white",
    paddingInline: 140,
    paddingBlock: 10,
  },
}));

const Login: React.FC<LoginProps> = ({}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.main}>
      <Grid container direction="column">
        <Grid item className={classes.logo}>
          <Twitter fontSize="large" />
        </Grid>
        <Grid item className={classes.header}>
          <Typography variant="h4">Log in to Twitter</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{ username: "" }}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              // alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
              history.push("/home");
            }}
          >
            <Form>
              <Field
                name="username"
                as={TextField}
                className={classes.teksti}
                id="username"
                label="Phone, email, or username"
                variant="outlined"
                color="primary"
              />
              <Field
                name="password"
                as={TextField}
                className={classes.teksti}
                id="password"
                label="Password"
                variant="outlined"
                color="primary"
              />
              <Button1 type="submit">Log in</Button1>
            </Form>
          </Formik>
        </Grid>
        <Grid item>
          <Box mt="20px">
            <Link href="/">Forgot password?</Link> {" ▫ "}{" "}
            <Link>Sign up for Twitter</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
