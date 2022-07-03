import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../../store/reducers/assets_reducer";
// Utils
import { numberWithCommas } from "../../utils/tools";

// The filter box on the right corner in the main page
const FilterBox = ({ filteredSearch, setModalOpen }) => {
  const user = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  return (
    <>
      {filteredSearch.dates ? (
        <div className="filtered_div">
          <h4 className="fliter_header">אתה צופה בתוצאות מסוננות:</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "noWrap",
            }}
          >
            <h6 className="filter_item">
              מיקום:{" "}
              <span style={{ fontWeight: "400" }}>
                {filteredSearch.location},
              </span>
            </h6>
            <h6 className="filter_item">
              מחיר מקסימלי לחודש:{" "}
              <span style={{ fontWeight: "400" }}>
                {numberWithCommas(filteredSearch.price)},
              </span>
            </h6>
            <h6 className="filter_item">
              מספר חדרים:{" "}
              <span style={{ fontWeight: "400" }}>
                {filteredSearch.numberOfRooms},
              </span>
            </h6>
            <h6 className="filter_item">
              טווח תאריכי כניסה: {""}
              <span style={{ fontWeight: "400" }}>
                {filteredSearch.dates[0]} -{" "}
                {filteredSearch.dates[filteredSearch.dates.length - 1]}
              </span>
            </h6>
          </div>
          <span className="click_here_span" onClick={() => setModalOpen(true)}>
            שינוי סינון
          </span>

          <span
            className="click_here_span"
            onClick={() => dispatch(resetFilter())}
          >
            איפוס סינון
          </span>
        </div>
      ) : (
        <div className="not_filtered_div">
          <h6>
            {user.firstname && <span> שלום {user.firstname}, </span>}
            על מנת לצפות בתוצאות מסוננות
            <span
              className="click_here_span"
              onClick={() => setModalOpen(true)}
            >
              לחץ כאן
            </span>
          </h6>
        </div>
      )}
    </>
  );
};

export default FilterBox;
