import { Button, withStyles } from "@material-ui/core";

export const Button2 = withStyles({
  root: {
    marginTop: 30,
    borderRadius: 30,
    color: "#1da1f2",
    background: "black",
    borderColor: "#1da1f2",
    paddingInline: 140,
    paddingBlock: 10,
  },
})(Button);
export const Button1 = withStyles({
  root: {
    marginTop: 30,
    background: "#1da1f2",
    borderRadius: 30,
    color: "white",
    paddingInline: 140,
    paddingBlock: 10,
  },
})(Button);
