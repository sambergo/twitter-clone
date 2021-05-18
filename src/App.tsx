import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
    },
    text: { primary: "#ffffff" },
  },
  typography: {
    fontFamily: "tewi, Source Code Pro, sans",
    button: {
      textTransform: "none",
      // borderRadius: 30,
      marginTop: 30,
      paddingInline: 140,
      // paddingBlock: 10,
      background: "#1da1f2",
      // color: "white",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
