import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAssets, resetSkip } from "../../store/reducers/assets_reducer";
import { filterAssets } from "../../store/actions/assets.thunk";
import { setFilteredSearch } from "../../store/reducers/assets_reducer";
import { toastify, numberWithCommas } from "../../utils/tools";
// Components
import Url from "../Url";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Material ui
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Checkbox,
  Slider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
// Dates
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// Css
import "./style.css";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   textAlign: "right",
  // },
  // form: {
  //   width: "100%",
  //   marginTop: theme.spacing(1),
  //   display: "flex",
  //   flexDirection: "column",
  // },
  // textField: {
  //   margin: "15px 10px",
  //   textAlign: "right !important",
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
  // header: {
  //   textAlign: "center",
  //   margin: theme.spacing(2),
  //   fontFamily: "Chilanka",
  // },
  // roomsTab: {
  //   width: "100%",
  //   marginBottom: "15px",
  //   display: "flex",
  //   flexDirection: "row",
  //   flexWrap: "nowrap",
  // },
  // areaTab: {
  //   marginBottom: "15px",
  //   display: "flex",
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  // },
  // areaTabChild: {
  //   width: "30%",
  // },
  // areaTabChildSmall: {
  //   width: "20%",
  // },
  // fullWidth: {
  //   width: "100%",
  // },
}));

const ShareModal = ({
  modalOpen,
  setModalOpen,
  isSublet,
  setPage,
  getFilteredAssets,
  setFilterObj,
}) => {
  const classes = useStyles();
  const filteredSearch = useSelector((state) => state.assets.filteredSearch);
  const skip = useSelector((state) => state.assets.skip);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [area, setArea] = useState(["הכל"]);
  const [roomsValue, setRoomsValue] = useState(["6"]);
  const [enterDate, setEnterDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [price, setPrice] = useState("10000");
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const [isAreaCheckboxDisabled, setIsAreaCheckboxDisabled] = useState(true);
  const [checkboxesChecked, setcheckboxesChecked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });
  const [areaCheckboxesChecked, setAreacheckboxesChecked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
  });
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();

  // Check the target room checkbox
  const checkTheCheckBox = (target) => {
    const isChecked = target.checked; // true if the click on the target set to check, fasle if the click set to uncheck
    const name = target.name; // the name is the number of the rooms
    setcheckboxesChecked({
      one:
        isChecked && name === "1"
          ? true
          : name !== "1" && checkboxesChecked.one,
      two:
        isChecked && name === "2"
          ? true
          : name !== "2" && checkboxesChecked.two,
      three:
        isChecked && name === "3"
          ? true
          : name !== "3" && checkboxesChecked.three,
      four:
        isChecked && name === "4"
          ? true
          : name !== "4" && checkboxesChecked.four,
      five:
        isChecked && name === "5"
          ? true
          : name !== "5" && checkboxesChecked.five,
    });
  };

  // Check the target area checkbox
  const checkTheAreaCheckBox = (target) => {
    const isChecked = target.checked;
    const name = target.name;

    setAreacheckboxesChecked({
      one:
        isChecked && name === "הצפון הישן"
          ? true
          : name !== "הצפון הישן" && areaCheckboxesChecked.one,
      two:
        isChecked && name === "הצפון החדש"
          ? true
          : name !== "הצפון החדש" && areaCheckboxesChecked.two,
      three:
        isChecked && name === "לב העיר"
          ? true
          : name !== "לב העיר" && areaCheckboxesChecked.three,
      four:
        isChecked && name === "שוק הכרמל"
          ? true
          : name !== "שוק הכרמל" && areaCheckboxesChecked.four,
      five:
        isChecked && name === "יפו"
          ? true
          : name !== "יפו" && areaCheckboxesChecked.five,
      six:
        isChecked && name === "אחר"
          ? true
          : name !== "אחר" && areaCheckboxesChecked.six,
      seven:
        isChecked && name === "רוטשילד"
          ? true
          : name !== "רוטשילד" && areaCheckboxesChecked.seven,
      eight:
        isChecked && name === "כרם התימנים"
          ? true
          : name !== "כרם התימנים" && areaCheckboxesChecked.eight,
      nine:
        isChecked && name === "פלורנטין"
          ? true
          : name !== "פלורנטין" && areaCheckboxesChecked.nine,
    });
  };

  const handleChange = (e) => {
    checkTheCheckBox(e.target);
    let roomsArr = roomsValue; // defualt value is 6
    if (!roomsArr.includes(e.target.name) && e.target.name !== "6") {
      roomsArr.push(e.target.name);
    } else if (!roomsArr.includes(e.target.name) && e.target.name === "6") {
      setIsCheckboxDisabled(true);
      roomsArr.push(e.target.name);
    } else if (roomsArr.includes(e.target.name) && e.target.name === "6") {
      setIsCheckboxDisabled(false);
      roomsArr = roomsArr.filter((room) => room !== e.target.name);
    } else {
      roomsArr = roomsArr.filter((room) => room !== e.target.name);
    }
    setRoomsValue([...roomsArr]);
  };

  const handleAreaChange = (e) => {
    checkTheAreaCheckBox(e.target);
    let areaArr = area;
    if (!areaArr.includes(e.target.name) && e.target.name !== "הכל") {
      areaArr.push(e.target.name);
    } else if (!areaArr.includes(e.target.name) && e.target.name === "הכל") {
      setIsAreaCheckboxDisabled(true);
      areaArr.push(e.target.name);
    } else if (areaArr.includes(e.target.name) && e.target.name === "הכל") {
      setIsAreaCheckboxDisabled(false);
      areaArr = areaArr.filter((room) => room !== e.target.name);
    } else {
      areaArr = areaArr.filter((room) => room !== e.target.name);
    }
    setArea([...areaArr]);
  };

  const handleClick = () => {
    const filteredObj = {
      location: area.includes("הכל") ? "הכל" : area.join(","),
      price,
      numberOfRooms: roomsValue.includes("6") ? "הכל" : roomsValue.join(","),
      dates,
    };
    dispatch(clearAssets());
    dispatch(setFilteredSearch(filteredObj));
    setPage(1);
    handleSubmit();
  };

  // Make the filter
  const handleSubmit = async () => {
    if (roomsValue.length === 0) {
      toastify("ERROR", "אנא סמן מספר חדרים");
    } else if (area.length === 0) {
      toastify("ERROR", "אנא בחר איזור");
    } else {
      const filterObj = {
        isSublet,
        roomsNumber: roomsValue,
        dates,
        price,
        area,
      };
      setFilterObj(filterObj);
      dispatch(resetSkip());
      getFilteredAssets(filterObj, 0);

      setModalOpen(false);
    }
  };

  const handleEnterDateChange = (date) => setEnterDate(date);

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i] = setReadableDate(arr[i]);
    }
    setDates(arr);
  };

  //Make the date readable
  const setReadableDate = (date) => {
    let newDateArr = date.toLocaleDateString().split("/");
    let temp = newDateArr[0];
    newDateArr[0] = newDateArr[1];
    newDateArr[1] = temp;
    return newDateArr.join("/");
  };

  // Hanlde price change
  const handlePriceChange = (e, value) => {
    setPrice(value);
  };

  const setFieldsValue = () => {
    const { numberOfRooms, location } = filteredSearch;
    if (!numberOfRooms.includes("הכל")) {
      setIsCheckboxDisabled(false);
      setcheckboxesChecked({
        one: numberOfRooms.includes("1") ? true : false,
        two: numberOfRooms.includes("2") ? true : false,
        three: numberOfRooms.includes("3") ? true : false,
        four: numberOfRooms.includes("4") ? true : false,
        five: numberOfRooms.includes("5") ? true : false,
      });
    }

    if (!location.includes("הכל")) {
      setAreacheckboxesChecked({
        one: location.includes("הצפון הישן") ? true : false,
        two: location.includes("הצפון החדש") ? true : false,
        three: location.includes("לב העיר") ? true : false,
        four: location.includes("שוק הכרמל") ? true : false,
        five: location.includes("יפו") ? true : false,
        six: location.includes("אחר") ? true : false,
        seven: location.includes("רוטשילד") ? true : false,
        eight: location.includes("כרם התימנים") ? true : false,
        nine: location.includes("פלורנטין") ? true : false,
      });
    }
  };

  const resetFilter = () => {
    // reset what the user sees
    setAreacheckboxesChecked({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
    });
    setcheckboxesChecked({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
    });
    setIsCheckboxDisabled(true);
    setIsAreaCheckboxDisabled(true);
    setPrice("10000");
    setEnterDate(new Date());

    // reset what behind the scene
    setArea(["הכל"]);
    setRoomsValue(["6"]);
  };

  useEffect(() => {
    let numWeeks = 2;
    let startDate = new Date(enterDate);
    let endDate = new Date(enterDate);
    endDate.setDate(endDate.getDate() + numWeeks * 7);
    startDate.setDate(startDate.getDate() - numWeeks * 7);
    getDaysArray(startDate, endDate);
  }, [enterDate]);

  useEffect(() => {
    if (filteredSearch.dates) {
      handleSubmit();
    }
  }, [isSublet]);

  useEffect(() => {
    if (modalOpen) {
      if (filteredSearch.dates) {
        setFieldsValue();
      } else {
        resetFilter();
      }
    }
  }, [modalOpen]);

  return (
    <>
      <Modal
        size="md"
        centered
        show={modalOpen}
        onHide={handleClick}
        className={classes.root}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: "auto" }}>
            <p> סנן את החיפוש </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={classes.form} autoComplete="off">
            <label className="time_label">מספר החדרים בנכס:</label>

            <div className={classes.roomsTab}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="1"
                    checked={checkboxesChecked.one}
                  />
                }
                label="1"
                disabled={isCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="2"
                    checked={checkboxesChecked.two}
                  />
                }
                label="2"
                disabled={isCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="3"
                    checked={checkboxesChecked.three}
                  />
                }
                label="3"
                disabled={isCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="4"
                    checked={checkboxesChecked.four}
                  />
                }
                label="4"
                disabled={isCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="5"
                    checked={checkboxesChecked.five}
                  />
                }
                label="5"
                disabled={isCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="6"
                    checked={isCheckboxDisabled}
                  />
                }
                label="הכל"
              />
            </div>

            <label className="time_label">איזור מבוקש :</label>

            <div className={classes.areaTab}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => handleAreaChange(e)}
                    name="הצפון הישן"
                    checked={areaCheckboxesChecked.one}
                  />
                }
                label="הצפון הישן"
                className={classes.areaTabChild}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="הצפון החדש"
                    checked={areaCheckboxesChecked.two}
                  />
                }
                label="הצפון החדש"
                className={classes.areaTabChild}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="לב העיר"
                    checked={areaCheckboxesChecked.three}
                  />
                }
                label="לב העיר"
                className={classes.areaTabChild}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="שוק הכרמל"
                    checked={areaCheckboxesChecked.four}
                  />
                }
                label="שוק הכרמל"
                className={classes.areaTabChild}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="יפו"
                    checked={areaCheckboxesChecked.five}
                  />
                }
                label="יפו"
                className={classes.areaTabChildBig}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="רוטשילד"
                    checked={areaCheckboxesChecked.seven}
                  />
                }
                label="רוטשילד"
                className={classes.areaTabChildBig}
                disabled={isAreaCheckboxDisabled}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="כרם התימנים"
                    checked={areaCheckboxesChecked.eight}
                  />
                }
                label="כרם התימנים"
                className={classes.areaTabChildBig}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="פלורנטין"
                    checked={areaCheckboxesChecked.nine}
                  />
                }
                label="פלורנטין"
                className={classes.areaTabChildSmall}
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAreaChange}
                    name="אחר"
                    checked={areaCheckboxesChecked.six}
                  />
                }
                className={classes.areaTabChildBig}
                label="אחר"
                disabled={isAreaCheckboxDisabled}
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAreaChange} name="הכל" />}
                className={classes.areaTabChildSmall}
                label="הכל"
                checked={isAreaCheckboxDisabled}
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.textField}
                  disablePast
                  label="תאריך כניסה"
                  value={enterDate ? enterDate : null}
                  format="dd/MM/yyyy"
                  onChange={handleEnterDateChange}
                  helperText="המערכת תציג לך דירות שתאריך הכניסה שלהם הוא שבועיים אחורה ושבועיים קדימה מהתאריך הנבחר"
                />
              </MuiPickersUtilsProvider>
            </div>

            <label>
              מחיר מקסימלי (לחודש שכירות) :
              <span className="price_span"> ₪{numberWithCommas(price)}</span>
            </label>
            <Slider
              onChange={handlePriceChange}
              defaultValue={10000}
              valueLabelDisplay="auto"
              step={100}
              min={1000}
              max={20000}
            />

            {/* Error Alert */}
            <Collapse in={openAlert}>
              <Alert
                severity="warning"
                style={{ position: "relative" }}
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => setOpenAlert(false)}
                  >
                    {" "}
                    <CloseIcon
                      fontSize="inherit"
                      style={{
                        margin: "5px",
                        position: "absolute",
                        right: "260px",
                        bottom: "3px",
                      }}
                    />{" "}
                  </IconButton>
                }
              >
                {message}
              </Alert>
            </Collapse>

            <button
              type="button"
              className="my-3 btn btn-danger w-100"
              variant="contained"
              color="primary"
              onClick={() => handleClick()}
              fullWidth
            >
              {" "}
              בצע סינון{" "}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareModal;
