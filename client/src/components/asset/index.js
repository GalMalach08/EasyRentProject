import React, { useEffect, useState } from "react";
// React router dom
import { useParams } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import {
  getAssetById,
  approveAssetById,
  deleteAssetByid,
} from "../../store/actions/assets.thunk";
// Components
import WrappedMap from "../../utils/GoogleMap";
import NotRelvantModal from "./noRelvantModal";
import AssetCard from "../assetCard";
import AssetDeletedModal from "../uploadAsset/AssetDeltedModal";
import AreYouSureModal from "../areYouSureModal";
// Utils
import { Loader } from "../../utils/tools";
// Material ui
import { Grid, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
// React bootstrap
import { Button } from "react-bootstrap";
// Packages
import { FacebookMessengerShareButton } from "react-share";
import ReactWhatsapp from "react-whatsapp";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Style
import "./style.css";
import { singleAssetPageStyle } from "../../styles";

// Material ui style
const useStyles = singleAssetPageStyle;

// Show asset on single page
const Asset = () => {
  const [asset, setAsset] = useState("");
  const [notRelevantModal, setNotRelevantModal] = useState(false);
  const [deletedmodalOpen, setDeletedmodalOpen] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [functionToExcute, setFunctionToExcute] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  // Open modal that checks if the user sure about the action
  const checkIfSure = (whatType) => {
    if (whatType === "approve") {
      setModalMessage("האם אתה בטוח שברצונך לאשר את הנכס ?");
      setFunctionToExcute(() => () => approveAsset());
    } else if (whatType === "delete") {
      setModalMessage("האם אתה בטוח שברצונך למחוק את הנכס ?");
      setFunctionToExcute(() => () => deleteAsset());
    }
    setModalType(whatType);
    setAreYouSureModal(true);
  };

  // Get the asset from the database
  const getAsset = async () => {
    setLoading(true);
    const { id } = params;
    dispatch(getAssetById(id))
      .unwrap()
      .then(({ asset }) => {
        setAsset(asset);
        setLoading(false);
      });
  };

  // Approve asset
  const approveAsset = async () => {
    setLoading(true);
    dispatch(approveAssetById(asset._id))
      .unwrap()
      .then(() => {
        setModalMessage("הנכס אושר בהצלחה !");
        setDeletedmodalOpen(true);
        setLoading(false);
      });
  };

  // Contact with the owner - only for admins about not approved asset
  const contact = () => {
    navigator.clipboard.writeText("asdasd");
    const win = window.open(
      "https://mail.google.com/mail/u/0/#inbox?compose=new",
      "_blank"
    );
    win.focus();
  };

  // Delete asset from the database
  const deleteAsset = async () => {
    setLoading(true);
    dispatch(deleteAssetByid(asset._id))
      .unwrap()
      .then(() => {
        setModalMessage("הנכס נמחק בהצלחה !");
        setDeletedmodalOpen(true);
        setLoading(false);
      });
  };

  // Fire the getAsset function on page load
  useEffect(() => {
    getAsset();
  }, []);

  // Make the text for the whatsapp button
  const createMarkup = () => {
    return {
      __html: `<img src="https://www.herzog.ac.il/wp-content/uploads/2017/11/whatsapp-icon-logo-vector.png" width:"25px" height="25px"/> &nbsp;&nbsp;צור קשר עם ${asset.owner} בווצאפ `,
    };
  };

  return (
    <div>
      {!loading ? (
        <Grid container>
          {asset && (
            <Grow in={true} timeout={700} key={asset.id}>
              <Grid item xs={12} className={classes.root}>
                <AssetCard asset={asset} assetPage={true} />
                {/* Whatsapp */}
                <div className="whatapp_div">
                  <ReactWhatsapp
                    number={`+972-${asset.userId.phoneNumber}`}
                    message={`היי ${asset.userId.firstname}, אני מעוניין בדירה שפרסמת ברחוב ${asset.address},האם עוד רלוונטי  ?`}
                    dangerouslySetInnerHTML={createMarkup()}
                    className="ip-add-cart whatsapps"
                  />
                </div>

                {/* Facebook */}
                <button className="ip-add-cart facebook">
                  <FacebookMessengerShareButton
                    url="https://www.youtube.com/channel/UCfAP5CpNwfgMKG-m4UXVpSQ"
                    to="10209538685461605"
                    appId="111391301676"
                  >
                    <FacebookIcon className={classes.icon} />
                    צור קשר עם {asset.owner} בפייסבוק
                  </FacebookMessengerShareButton>
                </button>

                {/* More details  */}
                <div className="more_details">
                  <h4>פרטים נוספים</h4>
                  <p>{asset.description}</p>
                </div>

                {/* Map */}
                <div className="map_div">
                  <WrappedMap address={asset.address} />
                </div>

                {/* Buttons */}
                {asset.notApproved && (
                  <div className="btns_div">
                    <Button
                      variant="success"
                      onClick={() => checkIfSure("approve")}
                    >
                      אשר נכס
                    </Button>{" "}
                    <CopyToClipboard text={asset.userId.email}>
                      <Button variant="info" onClick={contact}>
                        צור קשר עם בעל הנכס
                      </Button>
                    </CopyToClipboard>
                    <Button
                      variant="danger"
                      onClick={() => checkIfSure("delete")}
                    >
                      מחק נכס
                    </Button>{" "}
                  </div>
                )}

                {/* Modals */}
                {!asset.notApproved && (
                  <h6
                    className="not_relevant"
                    onClick={() => setNotRelevantModal(true)}
                  >
                    הנכס לא רלוונטי? עדכנו אותנו
                  </h6>
                )}
                <NotRelvantModal
                  notRelevantModal={notRelevantModal}
                  setNotRelevantModal={setNotRelevantModal}
                  assetId={asset._id}
                />
              </Grid>
            </Grow>
          )}
          <AssetDeletedModal
            message={modalMessage}
            DeletedmodalOpen={deletedmodalOpen}
          />
          <AreYouSureModal
            modalOpen={areYouSureModal}
            setModalOpen={setAreYouSureModal}
            message={modalMessage}
            functionToExcute={functionToExcute}
            modalType={modalType}
          />
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Asset;
