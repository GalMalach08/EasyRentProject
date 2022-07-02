import React, { useEffect, useState } from "react";

const Review = ({ steps }) => {
  const [preferences, setPreferences] = useState({
    price: "",
    area: "",
    numberOfRooms: "",
  });

  useEffect(() => {
    const { price, area, numberOfRooms } = steps;
    setPreferences({ price, area, numberOfRooms });
  }, [steps]);

  return (
    <div style={{ width: "100%" }}>
      <h3>סיכום</h3>

      <table className="table " style={{ color: "white" }}>
        <thead>
          <tr>
            <th scope="col">מחיר</th>
            <th scope="col">איזור</th>
            <th scope="col"> חדרים</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>עד {preferences.price.value} שח</td>
            <td>{preferences.area.value}</td>
            <td>{preferences.numberOfRooms.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Review;
