import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  media: {
    height: 350,
  },
});

export default function ItemSkeleton(props) {
  const classes = useStyles();
  const number = props.number;

  return (
    <React.Fragment>
      {[...Array(number)].map((e, i) => (
        <Grid item align="center" key={i}>
          <Card className={classes.root}>
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />
            <Typography variant="h3">
              <Skeleton animation="wave" width="55%" />
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16 }}>
              <Skeleton animation="wave" width="75%" />
            </Typography>
          </Card>
        </Grid>
      ))}
    </React.Fragment>
  );
}
