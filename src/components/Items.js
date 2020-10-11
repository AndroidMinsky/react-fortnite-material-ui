import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  makeStyles,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ItemSkeleton from "./ItemSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
  },
  media: {
    height: 350,
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Items() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const fetchItems = async () => {
    const data = await fetch(
      "https://fortniteapi.io/v1/items/upcoming?lang=en?limit=10",
      {
        headers: { Authorization: "0e35f61e-772d4b2f-35245465-f8b6c26c" },
      }
    ).then((response) => response.json());
    setItems(data.items);
    setLoading(true);
    console.log(data);
  };

  let location = useLocation();

  function descriptionShortener(data) {
    let dataArr = data.split(" ");
    if (dataArr.length >= 7) {
      return dataArr.slice(0, 6).join(" ").concat("...");
    } else {
      return dataArr.join(" ");
    }
  }

  return (
    <Container fixed>
      <Grid container justify="center" spacing={4} className={classes.grid}>
        <Grid container item direction="column">
          <Filter />
        </Grid>
        {loading ? (
          items.map((item) => (
            <Grid item key={item.id}>
              <Link
                to={{
                  pathname: `/item/${item.id}`,
                  state: { background: location },
                }}
                className={classes.link}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.images.background}
                      title={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {descriptionShortener(item.description)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <ItemSkeleton number={6} />
        )}
      </Grid>
    </Container>
  );
}

function Filter() {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Typography variant="h5">Filter by rarity</Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="Uncommon"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
            />
          }
          label="Rare"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedC}
              onChange={handleChange}
              name="checkedC"
            />
          }
          label="Epic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedD}
              onChange={handleChange}
              name="checkedD"
            />
          }
          label="Legendary"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedE}
              onChange={handleChange}
              name="checkedE"
            />
          }
          label="Special"
        />
      </FormGroup>
    </>
  );
}
