import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  branches: {
    minWidth: "300px",
    textAlign: "center",
    margin: "0 40px 0 60px",
    display: "flex",
    flexDirection: "column",
  },
  fromBranch :{
    overflow: "hidden",
    whiteSpace:"nowrap",
    textOverflow: "ellipsis"
  },
  toBranch :{
    overflow: "hidden",
    whiteSpace:"nowrap",
    textOverflow: "ellipsis"
  }

});

class Branches extends Component {
  render() {
    const { classes, fromBranch, toBranch } = this.props; 

      return (
        <Grid item className={classes.branches}>
          <Typography variant="subtitle2" className={classes.fromBranch} color="secondary">{fromBranch}</Typography>
            <i className="fas fa-arrow-down"/>
          <Typography variant="subtitle2" className={classes.toBranch} color="secondary">{toBranch}</Typography>
        </Grid>

      );
    }
  }

Branches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Branches);
