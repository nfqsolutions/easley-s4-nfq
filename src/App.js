import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import DetailsContainer from "./components/DetailsContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      allFinalData: [],
      value: "aui",
      isLoading: true,
      tab: "OPEN",
      next: "",
    };
    this.changeRepository = this.changeRepository.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.hideTab = this.hideTab.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleTab(tab) {
    this.setState({ tab: tab })
  }

  handleNext(next) {
    this.setState({ next: next})
  }

  changeRepository(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.getRepository();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.getRepository();
    }
    if (this.state.tab !== prevState.tab) {
      this.getRepository();
    }
    if (this.state.next !== prevState.next) {
      this.getRepository();
    }
  }

  getRepository() {
    let repositoryName = this.state.value;

    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/?state=${this.state.tab}`;

    fetch(prEndpoint)
      .then(response => response.json())
      .then(data => {
        const nextUri = data.next;
        const onePullRequest = data.values.map(item => {
          return {
            id: item.id,
            uriReviewer: `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/` + item.id + `/?state=${this.state.tab}`,
          };
        });

        this.setState({
          pullRequests: onePullRequest,
          isLoading: false,
          next: nextUri
        });

        const urisForFetchReviewers = this.state.pullRequests.map(pullrequest => {
          return pullrequest.uriReviewer;
          }
        );

        const prWithReviewers = [];
        urisForFetchReviewers.map(uri => {

          return (
          fetch(uri)
            .then(response => response.json())
            .then(dataWithReviewers => {
              prWithReviewers.push(dataWithReviewers);
              return this.setState({
                allFinalData: prWithReviewers
              })
            })
        )});
      });
  }

  hideTab(tab) {
    let hideTab = "";
    const openTab = this.state.tab;
    if(tab !== openTab) {

    }
    tab !== openTab ? (hideTab = "details__tab--selected") : (hideTab = "");
    return hideTab;
  }

  render() {
    const { allFinalData, value, isLoading, tab, next } = this.state;
    const changeRepository = this.changeRepository;
    console.log('next', next);
    return (
      <div className="App">
        <Header value={value} changeRepository={changeRepository} />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Summary />;
              }}
            />
            <Route
              exact
              path="/details"
              render={() => {
                return (
                  <DetailsContainer
                  pullRequests={allFinalData}
                  value={value}
                  isLoading={isLoading}
                  handleTab={this.handleTab}
                  hideTab={this.hideTab}
                  tab={tab}
                  next={next}
                  handleNext={this.handleNext}
                  />
                );
              }}
            />
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
