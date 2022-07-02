import React, { useEffect, useState, useRef } from "react";
// React-Router-Dom
import { useParams, useNavigate } from "react-router-dom";
// React-Redux
import { useSelector, useDispatch } from "react-redux";
import { setJustEntered } from "../../store/reducers/users_reducer";
import { clearAssets, resetSkip } from "../../store/reducers/assets_reducer";
import {
  getAssetsByCategory,
  filterAssets,
} from "../../store/actions/assets.thunk";
import { setUserPrefrences } from "../../store/actions/user.thunk";
// Utils
import { Loader } from "../../utils/tools";
// Components
import AssetCard from "../assetCard";
import FilterSearchModal from "../filterSearchModal";
import ChangePasswordModal from "./changePasswordModal";
// import ChatBot from "../chatbot";
import ChatBot from "../Chat";
import FilterBox from "../filterSearchModal/FilterBox";
import ChatBotBox from "./ChatBotBox";
// Material ui
import { Grid, Grow } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
// Bootstrap
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
// Css
import "./style.css";

const Home = () => {
  // Redux state
  const assets = useSelector((state) => state.assets.data);
  const loading = useSelector((state) => state.assets.loading);
  const filteredSearch = useSelector((state) => state.assets.filteredSearch);
  const skips = useSelector((state) => state.assets.skip);
  const assetsTotalLength = useSelector(
    (state) => state.assets.assetsTotalLength
  );
  const user = useSelector((state) => state.users.data);
  const auth = useSelector((state) => state.users.auth);
  const isVerified = useSelector((state) => state.users.data.isVerified);

  // Component state
  const [modalOpen, setModalOpen] = useState(false);
  const [isSublet, setIsSublet] = useState(false);
  const [changedPasswordModal, setChangedPasswordModal] = useState(false);
  const [filObj, setFilterObj] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [isBot, setIsBot] = useState(false);
  // Params
  const { id } = useParams();
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();
  // UseRef
  const firstUpdate = useRef(true);

  // Get all the assets
  const getAssets = async (skip = skips) => {
    dispatch(getAssetsByCategory({ id, skip, limit }))
      .unwrap()
      .then(({ assets }) => {
        if (!assets) navigate("/5");
      });
  };

  // Get filtered assets
  const getFilteredAssets = (filterObject = filObj, skip = skips) => {
    dispatch(filterAssets({ filterObj: filterObject, skip, limit }));
  };

  const handleChatbot = ({ values }) => {
    if (values[0] === "not") {
      setTimeout(() => setIsBot(false), 3000);
    } else {
      const [, numberOfRooms, price, area] = values;
      dispatch(
        setUserPrefrences({
          userId: user._id,
          roomsNumber: numberOfRooms,
          price,
          area,
        })
      );
      setTimeout(() => setIsBot(false), 3000);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!filteredSearch.dates) {
      dispatch(clearAssets());
      getAssets();
    }
  }, [filteredSearch]);

  useEffect(() => {
    id === "15" ? setIsSublet(false) : setIsSublet(true);
    dispatch(resetSkip());
    dispatch(clearAssets());
    if (!filteredSearch.dates) {
      getAssets(0);
    }
  }, [id]);

  useEffect(() => {
    if (user.isJustChangedPassword) {
      setChangedPasswordModal(true);
    }
    if (!user.preferences && user.firstname) {
      // the user is excist and has no prefrences
      setIsBot(true);
    }
    dispatch(setJustEntered());
  }, []);

  return (
    <>
      {/* Filter Box */}
      <FilterBox filteredSearch={filteredSearch} setModalOpen={setModalOpen} />

      <div className="not_filtered_divs">
        {/* Chat Bot Box */}
        {/* <ChatBotBox setIsBot={setIsBot} /> */}
        {isVerified && (
          <div className="chatbot">
            <Grow in={true} timeout={3000}>
              <ChatBot handleChatbot={handleChatbot} />
            </Grow>
          </div>
        )}
        {/* Header */}
      </div>
      <div className="header">
        {isSublet ? <h1>סאבלט.</h1> : <h1>השכרה.</h1>}
      </div>

      {/* Apartments Grid */}
      <StylesProvider injectFirst>
        <div className="container">
          <Grid container>
            {loading ? <Loader /> : null}
            {assets.length !== 0
              ? assets.map((asset, i) => (
                  <Grow in={true} timeout={700} key={i}>
                    <Grid item xs={12} lg={6}>
                      <AssetCard asset={asset} />
                    </Grid>
                  </Grow>
                ))
              : !loading && (
                  <Alert variant="success" style={{ margin: "50px auto" }}>
                    <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                    <p>
                      אין נכסים {isSublet ? "למטרת סאבלט" : "להשכרה"} התואמים
                      לתנאים שהזנת
                    </p>
                    <p>
                      על מנת להמשיך ולחפש נכסים נוספים אפס את הסינון או שנה אותו
                      בחלונית המופיעה מעלה
                    </p>
                  </Alert>
                )}
          </Grid>

          {/* Load more button */}
          {assetsTotalLength > assets.length && !loading ? (
            <Button
              className="page_button mb-6"
              variant="secondary"
              onClick={() => {
                if (filteredSearch.dates) getFilteredAssets();
                else getAssets();
              }}
            >
              טען עוד דירות
            </Button>
          ) : (
            !loading && (
              <h3 className="seen_all_header">
                ראיתם הכל, דירות חדשות עולות כל הזמן המשיכו להתעדכן 😀
              </h3>
            )
          )}
        </div>

        {/* Modals */}
        <ChangePasswordModal
          changePasswordModal={changedPasswordModal}
          setChangedPasswordModal={setChangedPasswordModal}
        />
        <FilterSearchModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          filteredSearch={filteredSearch}
          isSublet={isSublet}
          page={page}
          setPage={setPage}
          getFilteredAssets={getFilteredAssets}
          setFilterObj={setFilterObj}
        />
      </StylesProvider>
    </>
  );
};

export default Home;
