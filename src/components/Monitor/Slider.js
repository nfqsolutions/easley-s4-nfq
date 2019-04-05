import React, { Component } from "react";
import PropTypes from 'prop-types';
import {fetchRepos} from '../../Services/RepoServices';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { promised } from "q";


const themeSlider = createMuiTheme({
  palette: {
    primary: {
    main: '#53abe1',
    contrastText: '#fff',
    },
  secondary: {
    main: '#333333',
    contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
    'Roboto',
    'sans-serif'].join(','),
    fontSize: 16
    }
});
const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
   
  }, 
  title: {
    textAlign: "center",
    marginTop: "10px"
  },
  card: {
    height: "120px",
    margin: "10px",
    backgroundColor: "lightGreen",
    border: "1px solid black"
    
  },
  contentAvatar: {
    maxWidth: "90px",

  },
  avatar: {
    margin: "10px",
    width: "60px",
    height: "60px"

  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  namePr:{
    textAlign: "left",
    flexBasis: "unset"
  },
  nameAuthor:{
    textAlign: "left",
    textTransform: "uppercase",
  },
  repos:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  comments:{
    width: "50px"
  }
});

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
    };
     this.getPullRequest = this.getPullRequest.bind(this);
  };

  componentDidMount(){
  this.getPullRequest()
  };

  getPullRequest(){
    fetchRepos()
      .then(data => {
        let apiResults = data.values.map(item => fetch(item.links.self.href));
        console.log('soy api results',apiResults)
        Promise.all(apiResults)
          .then(response => {
            
            const res = response.map(response => response.json())
            Promise.all(res)
              .then(urlReviewers =>{
                console.log('¿?',urlReviewers)
                this.setState({
                  results:urlReviewers
                })
              })
            })
           })
          }  
    
   render() {
    const {classes} = this.props;
    const {results} = this.state;

    if(results){
      return (
        <React.Fragment>
          <CssBaseline>
            <MuiThemeProvider theme={themeSlider}>
              <Grid container className={classes.root} justify="center" alignItems="center" spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="h2" color="primary" className={classes.title}>
                    {results[0].source.repository.name}
                    </Typography>
                </Grid>

                {results.map(item => {
                  return (
                    <Grid key={item.id} item xs={12}>
                      <Card className={classes.card}>
                        <CardContent className={classes.content}>
                          <Grid item xs={1} className={classes.contentAvatar}>
                            <Avatar alt="Remy Sharp" src={item.author.links.avatar.href} className={classes.avatar}/>
                          </Grid>

                          <Grid item xs={3}>
                            <Typography variant="subtitle1" className={classes.namePr}>
                              {item.title}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.nameAuthor}>
                              {item.author.display_name}
                            </Typography>
                          </Grid>

                          <Grid item xs={2} className={classes.repos}>
                            <Typography variant="subtitle2">
                              {item.source.branch.name}
                            </Typography> <i className="fas fa-arrow-down "></i>
                            <Typography variant="subtitle2">
                              {item.destination.branch.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={2} className={classes.comments}>
                            <Typography variant="subtitle2">
                            <i className="far fa-comment-dots fa-2x"></i> <br/> {item.comment_count}
                            </Typography>
                          </Grid>

                          <Grid item xs={2}>
                            {
                              item.reviewers.map(item => {
                                return(
                                  <Avatar alt="Remy Sharp" src={item.links.avatar.href}/>
                                )
                              })
                            }
                          </Grid> 

                          <Grid item xs={2}>
                            <Typography variant="subtitle2">
                              {item.created_on}
                            </Typography>
                          </Grid>

                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })}

              </Grid>
            </MuiThemeProvider>
          </CssBaseline>
        </React.Fragment>

      );}
      else {
        return(
        <div><CircularProgress className={classes.progress} color="secondary"/></div>
        )}
    }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Slider);