import { makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",

    "& > *": {}
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "auto"
  },
  gridClass: {
    spacing: 0,
    alignItems: "center",
    justifyAlign: "center",
    justifyContent: "center"
  },
  appBar: {
    marginBottom: "30px",
    marginTop: "0px",
    marginRight: "0px",
    marginLeft: "0px"
  },
  paper: {
    maxWidth: 1500,
    maxheight: 1500
  },
  media: {
    height: 50,
    width: 50
    // 16:9
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
