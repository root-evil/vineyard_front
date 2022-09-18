import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import ui from "../../../store/ui";

const useStyles = makeStyles({
  rocket: {
    height: "100%",
    zIndex: 0,
    "@global": {
      ".awssld__bullets": {
        zIndex: 10,
        bottom: "1rem",
      },
      ".awssld__bullets button": {
        backgroundColor: "#fff",
        opacity: 0.5,
        width: 10,
        height: 10,

        "&:hover": {
          opacity: 0.2,
        },
      },
      ".awssld__timer": {
        backgroundColor: "rgba(0,0,0,0)",
      },
    },
  },
  title: {
    fontSize: "3rem",
    color: "#fff",
    marginBottom: "1rem",

    "@media (max-width: 800px)": {
      fontSize: "2rem",
    },
  },
  paper: {
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const items = [
  {
    imageUrl: "",
    subject: "Тест",
    body: "Тест текст",
  },
  {
    imageUrl: "",
    subject: "Тест",
    body: "Тест текст",
  },
];

const Slider = view(() => {
  const classes = useStyles();

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(shuffle(items));
  }, [items]);

  const resize = useCallback(() => {
    setCurrentWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize, false);

    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, [resize]);

  const mapItems = data.map((item) => {
    const styles = {
      minWidth: `${currentWidth}px`,
      backgroundImage: `url('${item.imageUrl}')`,
      backgroundPosition: "50% 20%",
      backgroundSize: "cover",
      position: "relative",
      color: "#fff",
      letterSpacing: "-0.025rem",
    };

    if (item.subject === "Savings Account") {
      styles.backgroundPosition = "50% 65%";
    }

    if (item.subject === "Bitcoin Account in a Few Minutes") {
      styles.backgroundPosition = "50% 0%";
    }

    return (
      <div key={item.subject} style={styles} className="h-full">
        <div className="absolute bg-black/[0.6] inset-0 z-0 w-full">
          <div className="flex flex-col justify-center max-w-6xl w-full h-full py-0 pl-4 z-[1] pr-3 sm:pr-96">
            <Typography variant="h2" className={classes.title}>
              {item.subject}
            </Typography>
            <p className="block w-full !text-sm tracking-wider md:!text-md">
              {item.body}
            </p>
          </div>
        </div>
      </div>
    );
  });

  const onClose = () => {
    localStorage.setItem("agroHelp", 1);
    ui.openHelp = false;
  };

  return (
    <Dialog
      open={ui.openHelp}
      disableEnforceFocus={true}
      onClick={(e) => e.stopPropagation()}
      classes={{ paper: classes.paper }}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {" "}
        <IconButton onClick={onClose} className={classes.close}>
          <Close />
        </IconButton>
        Помощь
      </DialogTitle>

      <DialogContent>
        <div className="w-full overflow-hidden relative min-h-96 max-h-96">
          <AutoplaySlider
            play={true}
            infinite={true}
            interval={15000}
            className={classes.rocket}
            cancelOnInteraction={false}
            bullets={true}
            organicArrows={false}
          >
            {mapItems}
          </AutoplaySlider>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default Slider;
