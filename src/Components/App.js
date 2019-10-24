import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../Services/RepoServices";


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import Header from "./Header";
import PullReqList from "./PullReqList";
import Footer from './Footer';

const styles = theme => ({
  html:{
    minHeight: "100%",
    position: "relative",
    backgroundColor: "#616161"

  },
  body:{
    margin: "0px",
    marginBottom: "40px",

  },
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  mainContainer:{
    overflowX: "hidden",
    overflowY: "hidden",
  },
  headerContainer: {
    height: "90px",
  },
  footerContainer: {
    width: "100%",
    height: "60px",
    bottom: "0",
    marginTop: "60px",
    textAlign: "center",
  }
});

const themeApp = createMuiTheme({
  palette: {
    primary: {
      main: '#45a5f5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#616161',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto', 
      'sans-serif',
      'Sniglet', 
      'cursive',
    ].join(','),
    fontSize: 16
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      dataSize: "",
      red: "",
      repoNames: [
        "atlaskit-mk-2",
        "atlassian-aws-deployment",
        "atlassian-azure-deployment",
        "atlasboard-atlassian-package",
        "atlassian-johnson",
        "almond-intellij-plugin",
        ]
      };
      this.getPullRequest = this.getPullRequest.bind(this);
  }

  componentDidMount() {
    this.getPullRequest();
  }

  getPullRequest() {
    let counter = 0;
    const showRepo = () => {
      if (counter > this.state.repoNames.length - 1) {
        counter = 0;
      }
      let repoName = this.state.repoNames[counter];

      fetchRepos(repoName).then(data => {
        let size = data.size;
        this.setState({
          dataSize: size
        });
        let apiResults = data.values.map(item => fetch(item.links.self.href));
        Promise.all(apiResults)
          .then(url => {
            const responseUrl = url.map(response => response.json());
              Promise.all(responseUrl)
                .then(urlId => {
                  console.log(urlId)
                  this.setState({
                    results: urlId
                  });
                  counter++;
              });
            });
          });
        };
      showRepo();
      setInterval(showRepo, 5000);
    }

  

  render() {
    const { classes} = this.props
    const { results, dataSize } = this.state;

    if (results) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <MuiThemeProvider theme={themeApp}>
            <header className={classes.headerContainer}>
              <Header results={results} dataSize={dataSize}/>
            </header>
            <main className={classes.mainContainer}>
              <PullReqList results={results}/>
            </main>
            <footer className={classes.footerContainer}>
              <Footer/>
            </footer>
          </MuiThemeProvider>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
