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
          <h4>אתה צופה בתוצאות מסוננות:</h4>
          <h6>
            מיקום:{" "}
            <span style={{ fontWeight: "400" }}>{filteredSearch.location}</span>
          </h6>
          <h6>
            מחיר מקסימלי לחודש:{" "}
            <span style={{ fontWeight: "400" }}>
              {numberWithCommas(filteredSearch.price)}
            </span>
          </h6>
          <h6>
            מספר חדרים:{" "}
            <span style={{ fontWeight: "400" }}>
              {filteredSearch.numberOfRooms}
            </span>
          </h6>
          <h6>
            טווח תאריכי כניסה:{" "}
            <span style={{ fontWeight: "400" }}>
              {filteredSearch.dates[0]} -{" "}
              {filteredSearch.dates[filteredSearch.dates.length - 1]}
            </span>
          </h6>
          <h6 style={{ marginTop: "15px" }}>
            על מנת לשנות את הסינון
            <span
              className="click_here_span"
              onClick={() => setModalOpen(true)}
            >
              לחץ כאן
            </span>
          </h6>
          <h6 style={{ marginTop: "15px" }}>
            על מנת לאפס את החיפוש
            <span
              className="click_here_span"
              onClick={() => dispatch(resetFilter())}
            >
              לחץ כאן
            </span>
          </h6>
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
