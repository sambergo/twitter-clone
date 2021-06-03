import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useMeQuery } from "./generated/graphql";
import Home from "./Home";
import Landing from "./Landing";
import Login from "./Login";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
    },
    text: { primary: "#ffffff", secondary: "#1da1f2" },
  },
  typography: {
    fontFamily: "tewi, Source Code Pro, sans",
    button: {
      textTransform: "none",
      marginTop: 30,
      paddingInline: 140,
      background: "#1da1f2",
    },
  },
});

function App() {
  const { data } = useMeQuery();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route path="/login" component={Login} />
        <Route path="/">
          {data?.me?.id ? <Home me={data.me} /> : <Landing />}
        </Route>
        {/* <Route path="/home" component={Home} /> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
