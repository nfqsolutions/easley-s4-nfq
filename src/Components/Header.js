import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Logotipe from '../images/logo-proa.png';

const styles = theme => ({
  
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo:{
    width: "190",
    height: "70px",
    margin: "15px"
  },
  titleRepo: {
    textAlign: "center",
    marginTop: "10px",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white"
  },
  size: {
    backgroundColor: "#45a5f5",
    width: "60px",
    height: "60px",
    color: "white",
    fontSize: "22px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin:"25px"
  }
});
class Header extends Component {
  render() {
    const {classes} = this.props;
    const {results, dataSize} = this.props;
    
    return (
      <Grid item xs={12} className={classes.titleContainer}>
        <div className={classes.logo}><img src={Logotipe} alt="Logotipe Proa"/></div>
        <Typography variant="h4" className={classes.titleRepo}>
          {results[0].source.repository.name}
        </Typography>
        <Avatar className={classes.size}>{dataSize}</Avatar>
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Header);

