import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addAsset,
  updateAsset,
  deleteApprovedAsset,
} from "../../store/actions/assets.thunk";
// Component
import AssetUploadedModal from "./AssetUploadedModal";
import AssetDeletedModal from "./AssetDeltedModal";
import AreYouSureModal from "../areYouSureModal";
import AlertBox from "./AlertBox";
// Utils
import { Loader } from "../../utils/tools";
// Material ui components
import {
  Grid,
  TextField,
  Button,
  Paper,
  Collapse,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Tabs,
  Tab,
  TextareaAutosize,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";
// Formik
import { Formik } from "formik";
import { errorHelper, assetValidationSchema } from "../../utils/formik";
// Dates
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// React image gallery
import ImageGallery from "react-image-gallery";
// moment
import moment from "moment";
// Style
import "./style.css";
import { updateAssetForm } from "../../styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => updateAssetForm(theme));

const UploadAsset = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedAsset, setUpdatedAsset] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [timeValue, setTimeValue] = useState(0);
  const [roomsValue, setRoomsValue] = useState("1");
  const [imageName, setImageName] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [enterDate, setEnterDate] = useState(new Date());
  const [exitDate, setExitDate] = useState(new Date());
  const [type, setType] = useState("");
  const [area, setArea] = useState("0");
  const [imagesArr, setImagesArr] = useState([]);
  const [isSublet, setIsSublet] = useState("1");
  const [DeletedmodalOpen, setDeletedmodalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [functionToExcute, setFunctionToExcute] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [buttonDisDate, setbuttonDisDate] = useState(false);
  const galleryRef = useRef();
  const addressRef = useRef();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data);

  const menuItem = [
    { value: "הצפון הישן" },
    { value: "הצפון החדש" },
    { value: "לב העיר" },
    { value: "פלורנטין" },
    { value: "שוק הכרמל" },
    { value: "רוטשילד" },
    { value: "כרם התימנים" },
    { value: "יפו" },
    { value: "אחר" },
  ];
  const rooms1 = [
    { value: "1", label: "חדר אחד" },
    { value: "1.5", label: "חדר וחצי" },
    { value: "2", label: "2 חדרים" },
    { value: "2.5", label: "2.5 חדרים" },
    { value: "3", label: "3 חדרים" },
  ];
  const rooms2 = [
    { value: "3.5", label: "3.5 חדרים" },
    { value: "4", label: "4 חדרים" },
    { value: "4.5", label: "4.5 חדרים" },
    { value: "5", label: "5 ומעלה" },
    { value: "6", label: "חדר בדירת שותפים" },
  ];

  // Formik
  const initialValues = {
    owner: `${
      updatedAsset
        ? `${updatedAsset.owner}`
        : `${user.firstname} ${user.lastname}`
    }`,
    phoneNumber: `${
      updatedAsset ? `${updatedAsset.phoneNumber}` : `${user.phoneNumber || ""}`
    }`,
    email: `${updatedAsset ? `${updatedAsset.email}` : `${user.email}`}`,
    address: `${updatedAsset && `${updatedAsset.address}`}`,
    price: `${updatedAsset && `${updatedAsset.price}`}`,
    images: `${updatedAsset && `${JSON.stringify(imagesArr)}`}`,
    notes: `${updatedAsset && `${updatedAsset.notes}`}`,
    description: `${updatedAsset && `${updatedAsset.description}`}`,
  };

  const validationSchema = assetValidationSchema;

  // Handle the date state
  const handleEnterDateChange = (date) => setEnterDate(date);
  const handleExitDateChange = (date) => setExitDate(date);

  // Handle rooms and time states
  const handleTimeChange = (e, index) => setTimeValue(index);
  const handleRoomsChange = (e, index) => setRoomsValue(index);

  // Handle image change
  const handleChangeImage = (e, setFieldValue) => {
    setImageName(e.target.files[0].name);
    const reader = new FileReader();
    if (e.target.files.length === 0) {
      setImageName("");
      setFieldValue("images", "");
    } else {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFieldValue("images", [
          ...imagesArr,
          { image: reader.result, name: e.target.files[0].name },
        ]);
        setGalleryImages([
          ...galleryImages,
          {
            original: reader.result,
            thumbnail: reader.result,
            originalHeight: "300px",
            originalWidth: "200px",
            thumbnailHeight: "100px",
            thumbnailWidth: "100px",
          },
        ]);
        setImagesArr([
          ...imagesArr,
          { image: reader.result, name: e.target.files[0].name },
        ]);
      };
    }
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const makeAssetObj = (values, pricePer) => {
    return {
      id: updatedAsset ? updatedAsset._id : null,
      ...values,
      enterDate: setReadableDate(enterDate),
      exitDate: setReadableDate(exitDate),
      roomsNumber: roomsValue,
      pricePer,
      isSublet: isSublet === "0" ? false : true,
      userId: user._id,
      updatedOn: moment().format("L"),
      pricePerMonth: caculatePricePerMonth(values.price, pricePer),
      area,
    };
  };

  const caculatePricePer = () => {
    return timeValue === 0
      ? "ליום"
      : timeValue === 1
      ? "לשבוע"
      : timeValue === 2
      ? "לחודש"
      : "לכל התקופה";
  };

  const finishProccess = (asset, message) => {
    if (asset) {
      setModalOpen(true);
      setOpenAlert(false);
      setbuttonDisabled(false);
    } else {
      setMessage(message);
      setOpenAlert(true);
      setbuttonDisabled(false);
    }
    setIsLoading(false);
  };

  // Submit the new asset and add to database
  const handeSubmit = async (values) => {
    try {
      setIsLoading(true);
      setbuttonDisabled(true);
      const pricePer = caculatePricePer();
      const assetObj = makeAssetObj(values, pricePer);
      if (updatedAsset) {
        dispatch(updateAsset(assetObj))
          .unwrap()
          .then(({ asset, message }) => {
            finishProccess(asset, message);
          });
      } else {
        dispatch(addAsset(assetObj))
          .unwrap()
          .then(({ asset, message }) => {
            finishProccess(asset, message);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Caculate the price per month
  const caculatePricePerMonth = (price, pricePer) => {
    let pricePerMonth = price;
    pricePer === "ליום"
      ? (pricePerMonth = price * 30)
      : pricePer === "לשבוע"
      ? (pricePerMonth = price * 4.3)
      : pricePer === "לכל התקופה"
      ? (pricePerMonth =
          Math.round(price / caculateDaysBetween(enterDate, exitDate)) * 30)
      : (pricePerMonth = price);
    console.log(pricePerMonth);
    return pricePerMonth;
  };

  // Caculate the days(helper fucntion to the function above)
  const caculateDaysBetween = (startDate, endDate) => {
    // To calculate the time difference of two dates
    const Difference_In_Time = endDate.getTime() - startDate.getTime();
    // To calculate the no. of days between two dates
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
  };

  // Make the date readable
  const setReadableDate = (date, bool) => {
    let newDateArr;
    if (bool) newDateArr = date.split("/");
    else newDateArr = date.toLocaleDateString().split("/");
    let temp = newDateArr[0];
    newDateArr[0] = newDateArr[1];
    newDateArr[1] = temp;
    return newDateArr.join("/");
  };

  // Delete image from the gallery
  const deleteImage = (e, index, setFieldValue) => {
    e.preventDefault();
    const newGalleryArr = galleryImages.filter((image, i) => i !== index);
    setGalleryImages(newGalleryArr);
    const newImagesArr = imagesArr.filter((image, i) => i !== index);
    setFieldValue("images", newImagesArr);
    setImagesArr(newImagesArr);
    setImageName("");
  };

  // Delete asset
  const deleteAsset = async () => {
    const deletedAssetId = location.state.asset._id;
    dispatch(deleteApprovedAsset(deletedAssetId))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          setDeletedmodalOpen(true);
        }
      });
  };

  const checkIfSure = (whatType, values) => {
    setType(whatType);
    if (whatType === "upload") {
      setModalMessage("האם אתה בטוח שברצונך להעלות את הנכס ?");
      setFunctionToExcute(() => () => handeSubmit(values));
    } else if (whatType === "update") {
      setModalMessage("האם אתה בטוח שברצונך לעדכן את הנכס ?");
      setFunctionToExcute(() => () => handeSubmit(values));
    } else if (whatType === "delete") {
      setModalMessage("האם אתה בטוח שברצונך למחוק את הנכס ?");
      setFunctionToExcute(() => () => deleteAsset());
    }
    setAreYouSureModal(true);
  };

  useEffect(() => {
    if (location.pathname.includes("/update")) {
      // Check if we are updating or uploading
      const asset = location.state.asset;
      setIsUpdate(true);
      const newImagesArr = [];
      const newGalleryArr = [];
      setUpdatedAsset(asset);
      setEnterDate(new Date(setReadableDate(asset.enterDate, true)));
      setExitDate(new Date(setReadableDate(asset.exitDate, true)));
      asset.pricePer === "לכל התקופה"
        ? setTimeValue(3)
        : asset.pricePer === "לחודש"
        ? setTimeValue(2)
        : asset.pricePer === "לשבוע"
        ? setTimeValue(1)
        : asset.pricePer === "ליום"
        ? setTimeValue(0)
        : setTimeValue(0);
      asset.isSublet ? setIsSublet("1") : setIsSublet("0");
      setRoomsValue(asset.roomsNumber);
      setArea(asset.area);
      asset.images.forEach((image) => {
        newImagesArr.push({
          image: image.image,
          name: image.imageName,
        });
        newGalleryArr.push({
          original: image.image,
          thumbnail: image.image,
          originalHeight: "300px",
          originalWidth: "200px",
          thumbnailHeight: "100px",
          thumbnailWidth: "100px",
        });
      });
      setGalleryImages([...newGalleryArr]);
      setImagesArr([...newImagesArr]);
    } else setIsUpdate(false);
  }, []);

  return (
    <Grid
      item
      xs={10}
      md={6}
      component={Paper}
      square
      className={classes.formGrid}
    >
      {user.isVerified ? (
        <div className={classes.paper}>
          <img
            src="https://static.crozdesk.com/web_app_library/providers/logos/000/005/518/original/easyrent-1559230516-logo.png?1559230516"
            width="100"
            height="100"
            crop="scale"
            alt="cart"
          />
          <h5 className="signup_header">
            שלום {user.firstname}, על מנת{" "}
            {updatedAsset ? " לעדכן את הנכס הנבחר" : " להעלות נכס חדש לאתר"},
            אנא מלא את הפרטים הבאים:
          </h5>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(props) => (
              <form className={classes.form} autoComplete="off">
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label=" * שם בעל הנכס "
                  name="owner"
                  {...props.getFieldProps("owner")}
                  {...errorHelper(props, "owner")}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="* מספר הטלפון של בעל הנכס "
                  name="phoneNumber"
                  {...props.getFieldProps("phoneNumber")}
                  {...errorHelper(props, "phoneNumber")}
                />

                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="* כתובת אימייל ליצירת קשר "
                  name="email"
                  {...props.getFieldProps("email")}
                  {...errorHelper(props, "email")}
                />

                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="*כתובת הנכס "
                  name="address"
                  {...props.getFieldProps("address")}
                  {...errorHelper(props, "address")}
                  ref={addressRef}
                />

                <label className="time_label">הדירה היא למטרת:</label>
                <RadioGroup
                  value={isSublet}
                  onChange={(e) => {
                    setIsSublet(e.target.value);
                    if (e.target.value === "0") {
                      setExitDate(
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                      );
                      setTimeValue(2);
                    } else {
                      setExitDate(new Date());
                      setTimeValue(3);
                    }
                  }}
                  className={classes.radioGroup}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="סאבלט"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="השכרה"
                  />
                </RadioGroup>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    disablePast
                    label="תאריך כניסה"
                    value={enterDate ? enterDate : null}
                    format="dd/MM/yyyy"
                    onChange={handleEnterDateChange}
                    minDateMessage="תאריך הכניסה עבר"
                    onError={() => setbuttonDisDate(true)}
                    onAccept={() => setbuttonDisDate(false)}
                  />
                  <KeyboardDatePicker
                    className={classes.textField}
                    disablePast
                    label="תאריך יציאה"
                    format="dd/MM/yyyy"
                    value={exitDate ? exitDate : null}
                    onChange={handleExitDateChange}
                    minDateMessage="תאריך היציאה עבר"
                  />
                </MuiPickersUtilsProvider>

                <TextField
                  type="number"
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="מחיר"
                  name="price"
                  {...props.getFieldProps("price")}
                  {...errorHelper(props, "price")}
                />
                <label className="time_label">המחיר המצוין הוא מחיר:</label>
                <Tabs
                  value={timeValue}
                  onChange={handleTimeChange}
                  style={{ margin: "0px 10px" }}
                >
                  <Tab label="יומי" {...a11yProps(3)} />
                  <Tab label="שבועי" {...a11yProps(2)} />
                  <Tab label="חודשי" {...a11yProps(1)} />
                  <Tab label="לכל התקופה" {...a11yProps(0)} />
                </Tabs>

                {/* Area */}
                <Select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  displayEmpty
                  className={classes.select}
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                >
                  <MenuItem value="0" disabled>
                    אנא בחר איזור
                  </MenuItem>
                  {menuItem.map(({ value }, i) => (
                    <MenuItem key={i} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className={classes.helperText}>
                  בחירת איזור תעלה את פופולריות הדירה שלך
                </FormHelperText>

                {/* Number of rooms */}
                <label className="time_label">מספר החדרים בנכס:</label>
                <RadioGroup
                  value={roomsValue}
                  onChange={(e) => setRoomsValue(e.target.value)}
                >
                  <div className={classes.roomsTab}>
                    {rooms1.map(({ value, label }, i) => (
                      <FormControlLabel
                        key={i}
                        value={value}
                        label={label}
                        control={<Radio />}
                      />
                    ))}
                  </div>
                  <div className={classes.roomsTab}>
                    {rooms2.map(({ value, label }, i) => (
                      <FormControlLabel
                        key={i}
                        value={value}
                        label={label}
                        control={<Radio />}
                      />
                    ))}
                  </div>
                </RadioGroup>

                {/* Notes */}
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="הערות"
                  name="notes"
                  {...props.getFieldProps("notes")}
                  {...errorHelper(props, "notes")}
                />
                <FormHelperText className={classes.helperText}>
                  מומלץ לציין פרטים שחשוב לשים אליו לב אליהם, לדוגמה: גמישות
                  בתאריכים
                </FormHelperText>

                {/* Description */}
                <FormLabel className={classes.formLabel}>
                  תיאור מפורט של הנכס:
                </FormLabel>
                <TextareaAutosize
                  className={classes.textArea}
                  rowsMin={3}
                  placeholder="תיאור מפורט של הנכס(על השותפים בדירה, לאן הדירה קרובה, פרטים על החוזה,אופציות נוספות ליצירת קשר)"
                  {...props.getFieldProps("description")}
                  {...errorHelper(props, "description")}
                />

                {/* Image */}
                <Input
                  multiple
                  id="file"
                  type="file"
                  name="images"
                  onChange={(e) =>
                    handleChangeImage(e, props.setFieldValue, props)
                  }
                  hidden
                  accept="image/*"
                />
                <Button
                  type="button"
                  style={{ display: "block", margin: "10px 10px" }}
                  color="primary"
                  variant="outlined"
                >
                  <ImageIcon className="" />
                  <label htmlFor="file">
                    {imageName ? `${imageName}  עלתה` : " העלה תמונה חדשה"}{" "}
                  </label>
                </Button>
                <FormHelperText style={{ margin: "5px 9px 5px" }}>
                  התמונות יוצגו באתר ברוחב של 600px ובגובה של 300px ,לכן אנו
                  ממליצים לכם להעלות את התמונה בגודל זה. ניתן לבצע את שינוי גודל
                  התמונה בקלות :{" "}
                  <a
                    style={{ color: "black" }}
                    href="https://www.iloveimg.com/resize-image"
                    target="_blank"
                    rel="noreferrer"
                  >
                    בקישור הבא
                  </a>
                </FormHelperText>

                {/* Image Gallery */}
                {galleryImages.length !== 0 && (
                  <div className="ab">
                    <ImageGallery
                      items={galleryImages}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      isRTL={true}
                      ref={galleryRef}
                      originalClass="gallery_image"
                    />
                    <button
                      type="button"
                      className="middle btn btn-danger p-2"
                      onClick={(e) =>
                        deleteImage(
                          e,
                          galleryRef.current.getCurrentIndex(),
                          props.setFieldValue
                        )
                      }
                    >
                      לחץ למחיקה
                    </button>
                  </div>
                )}

                {props.errors.image && props.touched.image ? (
                  <div className="error">{props.errors.image}</div>
                ) : null}

                {/* Error Alert */}
                <Collapse in={openAlert}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => setOpenAlert(false)}
                      >
                        {" "}
                        <CloseIcon fontSize="inherit" />{" "}
                      </IconButton>
                    }
                  >
                    {message}
                  </Alert>
                </Collapse>
                <Button
                  disabled={
                    area !== "0" &&
                    props.values.price &&
                    props.values.owner &&
                    props.values.address &&
                    !props.errors.address &&
                    props.values.phoneNumber &&
                    props.values.images.length !== 0 &&
                    !buttonDisabled
                      ? false
                      : true
                  }
                  className="m-3"
                  style={{ width: `${updatedAsset ? "44%" : "95%"}` }}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    checkIfSure(
                      updatedAsset ? "update" : "upload",
                      props.values
                    )
                  }
                >
                  {updatedAsset ? "עדכן נכס" : "העלה נכס"}
                </Button>
                {updatedAsset && (
                  <Button
                    className="m-3"
                    style={{ width: "44%" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => checkIfSure("delete")}
                  >
                    מחק נכס
                  </Button>
                )}
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <>
          <AlertBox />
        </>
      )}
      {/* Modals */}
      <AssetUploadedModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isUpdate={isUpdate}
      />
      <AssetDeletedModal
        DeletedmodalOpen={DeletedmodalOpen}
        message={"הנכס נמחק מהאתר בהצלחה!"}
      />
      <AreYouSureModal
        modalOpen={areYouSureModal}
        setModalOpen={setAreYouSureModal}
        message={modalMessage}
        functionToExcute={functionToExcute}
        modalType={type}
      />
      {isLoading && <Loader />}
    </Grid>
  );
};

export default UploadAsset;
