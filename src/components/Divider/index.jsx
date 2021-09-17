import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    margin: "20px auto",
    maxWidth: 500,
    width: "100%",
  },
  border: {
    borderBottom: "1px solid lightgray",
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(0.1),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 700,
    fontSize: 18,
    whiteSpace: "nowrap",
  }
}));


type DividerProps = {
    children: ReactNode;
  }
  

const DividerWithText = ({ children } : DividerProps) => {
 const classes = useStyles();
 return (
  <div className={classes.container}>
    <div className={classes.border} />
    <span className={classes.content}>{children}</span>
    <div className={classes.border} />
  </div>
 );
};


const DividerWithOutText = () => {
    const classes = useStyles();
    return (
     <div className={classes.container} style={{maxWidth: 250}}>
       <div className={classes.border} />
     </div>
    );
   };

export { DividerWithText, DividerWithOutText };