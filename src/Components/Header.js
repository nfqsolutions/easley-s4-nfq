import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Logotipe from '../images/logo-proa.png';

const styles = theme => ({
  
  titleContainer: {
    height: "90px",
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
    textTransform: "uppercase",
    fontWeight: "700",
    color: "white"
  },
  size: {
    width: "60px",
    height: "60px",
    margin: "15px 20px 21px 0",
    backgroundColor: "#45a5f5",
    color: "white",
    fontSize: "22px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
class Header extends Component {
  render() {
    const {classes} = this.props;
    const {results, dataSize} = this.props;
    
    return (
      <Grid item xs={12} className={classes.titleContainer}>
        <div>
          <img src={Logotipe} alt="Logotipe Proa" className={classes.logo}/>
        </div>
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

