import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal as ModalWindow,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[4],
    // padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

export default function Modal() {
  let history = useHistory();
  let { id } = useParams();
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({
    images: {},
  });

  const fetchItem = async () => {
    const data = await fetch(
      `https://fortniteapi.io/v1/items/get?id=${id}&lang=en`,
      {
        headers: { Authorization: "0e35f61e-772d4b2f-35245465-f8b6c26c" },
      }
    ).then((response) => response.json());
    setItem(data.item);
    setLoading(true);
  };

  let back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div>
      {loading ? (
        <ModalWindow
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={back}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <img
              src={item.images.full_background}
              style={{ maxWidth: 500 }}
            ></img>
          </div>
        </ModalWindow>
      ) : (
        <ModalWindow
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={back}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <CircularProgress color="secondary" />
          </div>
        </ModalWindow>
      )}
    </div>
  );
}
