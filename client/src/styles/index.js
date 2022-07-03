import { makeStyles } from "@material-ui/core/styles";

export const updateAssetForm = (theme) => ({
  formGrid: {
    margin: "50px auto 10px ",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  select: {
    margin: "35px 10px 3px",
  },
  helperText: {
    margin: "0px 10px 20px",
  },
  formLabel: {
    margin: "5px  15px",
    fontFamily: "var(--bs-body-font-family)",
    color: "black",
  },
  textArea: {
    margin: "15px 10px",
    width: "100%",
    padding: "10px",
    border: "1px solid lightgrey",
    borderRadius: "4px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    textAlign: "center",
    margin: theme.spacing(2),
    fontFamily: "Chilanka",
  },
  roomsTab: {
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: "0px 10px",
  },
  fullWidth: {
    width: "100%",
  },
  radioGroup: {
    flexWrap: "nowrap",
    flexDirection: "row",
    margin: "10px",
  },
});

export const singleAssetPageStyle = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    margin: "0px 10px",
  },
}));

export const caruselStyle = makeStyles(() => ({
  slider: {
    width: "400px",
    maxWidth: "400px",
  },
}));

export const emailStepperStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
    padding: "10px",
    backgroundColor: "azure",
    borderRadius: "10px",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
}));
