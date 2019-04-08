import React, { Component } from "react";
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';


const themePullReqList = createMuiTheme({
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
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center"
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
  },
  reviewrsContainer:{
    display: "flex",
    flexDirection: "row",
  },
  avatarReviewrs: {
    margin: "5px"
  },
  size: {
    backgroundColor: "blue",
    color: "white",
    maxWidth: "100px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
class PullReqList extends Component {
  render() {

    const {classes} = this.props;
    const { results } = this.props;

    return (
      <React.Fragment>
        <CssBaseline>
          <MuiThemeProvider theme={themePullReqList}>
            <Grid container className={classes.root} justify="center" alignItems="center" spacing={8}>
              {results.map((item,index) => {
                return (
                  <Grid key={item.id} item xs={12}>
                    <Card className={classes.card} key={index}>
                      <CardContent className={classes.content} key={index}>
                      
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

                        <Grid item xs={1} className={classes.comments}>
                          <Typography variant="subtitle2">
                          <i className="far fa-comment-dots fa-2x"></i> <br/> {item.comment_count}
                          </Typography>
                        </Grid>

                        <Grid item xs={2} className={classes.reviewrsContainer}>
                          {
                            item.reviewers.map((item,index) => {
                              return(
                                <Avatar alt="Remy Sharp" src={item.links.avatar.href} className={classes.avatarReviewrs} key={index}/>
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
    );
  }
}


PullReqList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(PullReqList);
