import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useSignUpMutation } from "./generated/graphql";

interface SignUpProps {
  open: boolean;
  handleClickOpen: () => any;
  handleClose: () => any;
}
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "rgba(64, 64, 64, 0.5)",
  },
  btnnext: {
    marginTop: 0,
    position: "absolute",
    right: 0,
    borderRadius: 30,
    marginRight: 10,
  },
  teksti: {
    width: "100%",
    marginBlock: 10,
    // color: "white",
  },
}));

const SignUp: React.FC<SignUpProps> = ({
  open,
  handleClose,
  handleClickOpen,
}) => {
  const [register] = useSignUpMutation();
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Dialog
        className={classes.root}
        fullScreen={window.innerWidth < 600}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: { backgroundColor: "black", borderRadius: "15px" },
        }}
      >
        <Grid container style={{ marginTop: "10px" }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center">
              <TwitterIcon fontSize="large" />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Button className={classes.btnnext}>Next</Button>
            </Box>
          </Grid>
        </Grid>
        <DialogTitle id="form-dialog-title">Create your account</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              password: "",
              fullname: "",
              username: "",
              email: "",
              dateOfBirth: "",
            }}
            onSubmit={async (values, actions) => {
              console.log({ values, actions });
              const res = await register({
                variables: {
                  input: {
                    ...values,
                  },
                },
              });
              //TODO ERROR FIELDIT
              console.log("res : ", res);
              history.push("/login");
            }}
          >
            <Form>
              <Field
                name="username"
                as={TextField}
                className={classes.teksti}
                id="username"
                label="Username"
                variant="outlined"
                color="primary"
              />
              <Field
                name="fullname"
                as={TextField}
                className={classes.teksti}
                id="fullname"
                label="Fullname"
                variant="outlined"
                color="primary"
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                className={classes.teksti}
                id="password"
                label="Password"
                variant="outlined"
                color="primary"
              />
              <Field
                name="email"
                type="email"
                as={TextField}
                className={classes.teksti}
                id="email"
                label="Email"
                variant="outlined"
                color="primary"
              />
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Date of birth
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "13px", fontStyle: "normal" }}
              >
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </Typography>
              <Field
                as={TextField}
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                color="primary"
                variant="outlined"
                className={classes.teksti}
              />
              <Button type="submit">Sign up</Button>
            </Form>
          </Formik>
          <Box style={{ height: "150px" }}></Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SignUp;
