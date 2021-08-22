import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  gridClass: {
    spacing: 0,
    alignItems: "center",
    justifyAlign: "center",
    justifyContent: "center"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1500,
    maxheight: 1500
  },
  media: {
    height: 50,
    width: 50
    // 16:9
  },
  root: {
    display: "flex"
  },
  balanceCard: {
    display: "flex",
    flexDirection: "row",
    minHeight: 100
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));
export { useStyles };
