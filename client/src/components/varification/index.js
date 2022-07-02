import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader } from "../../utils/tools";
import { verifyUserEmail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";
const Varification = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const token = search.get("t");

  useEffect(() => {
    if (token) {
      console.log(token);
      dispatch(verifyUserEmail(token))
        .unwrap()
        .then(({ verified, message }) => {
          if (verified) {
            navigate("/5");

            if (message) {
              toastify("SUCCESS", message);
            } else {
              toastify("SUCCESS", "המשתמש אומת בהצלחה");
            }
          }
        });
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Varification;
