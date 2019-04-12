import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';

import PullReqCard from "./PullReqCard";



class PullReqList extends Component {
  render() {
    const { results} = this.props;
    
      return (
        <Grid container justify="center" alignItems="center" spacing={8}>
          {results.map(item => {
            return (
              <Grid key={item.id} item xs={12}>
                <PullReqCard 
                  authorAvatar={item.author.links.avatar.href}
                  title={item.title}
                  authorName={item.author.display_name}
                  fromBranch={item.source.branch.name}
                  toBranch={item.destination.branch.name}
                  comments={item.comment_count}
                  reviewers={item.reviewers}
                  participants={item.participants}
                  date={item.updated_on}
                  id={item.id}
                />
             

              </Grid>
            )
          })}
        </Grid>
      );
    }
  }


export default PullReqList;
