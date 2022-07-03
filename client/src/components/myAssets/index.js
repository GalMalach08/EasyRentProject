import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssetsOfUser,
  getNotApprovedAssetsOfUser,
} from "../../store/actions/assets.thunk";
import Url from "../Url";
import AssetCard from "../assetCard";
import { Grid, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "react-bootstrap";
import { Loader } from "../../utils/tools";
import "./style.css";
// material ui style
const useStyles = makeStyles(() => ({
  // root: {
  //   display: "flex",
  //   alignItems: "center",
  //   flexDirection: "column",
  // },
  // icon: {
  //   margin: "0px 10px",
  // },
}));

const MyAssets = (props) => {
  const user = useSelector((state) => state.users.data);
  const assets = useSelector((state) => state.assets.data);
  const loading = useSelector((state) => state.assets.loading);
  const classes = useStyles();
  const [notApprovedAssets, setNotApprovedAssets] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const getAssets = async () => {
    const { id } = params;
    dispatch(getNotApprovedAssetsOfUser(id))
      .unwrap()
      .then((data) => setNotApprovedAssets(data.notApprovedAssets));
    dispatch(getAssetsOfUser(id));
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <div className="container">
      <Grid container>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            {notApprovedAssets.length !== 0 && (
              <div className="container m-auto mt-5">
                <Alert variant="success">
                  <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                  <p>
                    ברשותך
                    {notApprovedAssets.length === 1
                      ? " נכס אחד שממתין "
                      : ` ${notApprovedAssets.length} נכסים שממתינים `}
                    לאישור. כאשר הנכס יאושר תקבל על כך הודעה למייל שאיתו רשמת את
                    הנכס לאתר.
                  </p>
                  <hr />
                </Alert>
              </div>
            )}
            {assets.length !== 0
              ? assets.map((asset, i) => (
                  <Grow in={true} timeout={700} key={i}>
                    <Grid item xs={11} lg={6} className={classes.root}>
                      <AssetCard asset={asset} />
                    </Grid>
                  </Grow>
                ))
              : notApprovedAssets.length === 0 && (
                  <div className="container m-auto mt-5">
                    <Alert variant="success">
                      <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                      <p>
                        אין ברשותך נכסים שהועלו לאתר, באם העלת נכס והוא לא מופיע
                        בדף זה, הנכס שלך נמצא בבדיקה של המערכת ותקבל עדכון לגביו
                        במייל שבו רשמת את הנכס
                      </p>

                      <hr />
                      <p className="mb-0">
                        על מנת להעלות נכס חדש לאתר
                        <span
                          className="click_here"
                          onClick={() => navigate("/upload")}
                        >
                          לחץ כאן
                        </span>
                      </p>
                    </Alert>
                  </div>
                )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default MyAssets;
