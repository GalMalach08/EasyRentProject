import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
const ChatBotBox = ({ setIsBot }) => {
  const user = useSelector((state) => state.users.data);
  const isVerified = useSelector((state) => state.users.data.isVerified);

  return (
    <>
      {isVerified ? (
        user.firstname ? (
          <h6>
            על מנת לשוחח עם העוזר הדיגיטלי שלנו
            <span className="click_here_span" onClick={() => setIsBot(true)}>
              לחץ כאן
            </span>
          </h6>
        ) : (
          <div></div>
        )
      ) : (
        <h6 style={{ lineHeight: "25px" }}>
          על מנת לשוחח עם העוזר הדיגיטלי שלנו אמת את חשבונך באימייל שאיתו נרשמת
          למערכת
        </h6>
      )}
    </>
  );
};

export default ChatBotBox;
