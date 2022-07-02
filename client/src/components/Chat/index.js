import React from "react";
// Redux
import { useSelector } from "react-redux";
// Component
import Review from "./Review";
// Packages
import ChatBot from "react-simple-chatbot";
// Style
import { ThemeProvider } from "styled-components";
import "./style.css";

const ChatBotComp = ({ handleChatbot }) => {
  const user = useSelector((state) => state.users.data);
  const theme = {
    background: "#f5f8fb",
    fontFamily: "arial",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#EF6C00",
  };
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        handleEnd={handleChatbot}
        headerTitle="EasyBot"
        floating={true}
        steps={[
          // Welcome message
          {
            id: "1",
            message: `שלום ${user.firstname}, כאן שלומי ואני העוזר הדיגטלי של EasyRent 😎 אני מזמין אותך לסמן את ההעדפות שלך לדירה ונדאג לשלוח לך מייל כשאר יעלו דירות רלוונטיות`,
            trigger: "2",
          },
          // Ask if the user wants to continue
          {
            id: "2",
            options: [
              {
                label: "מעוניין להמשיך",
                trigger: "numberOfRoomsMessage",
                value: "yes",
              },
              {
                label: "אוותר בינתיים",
                trigger: "end-message-not",
                value: "not",
              },
            ],
          },
          // Number of rooms message
          {
            id: "numberOfRoomsMessage",
            message: "מספר החדרים:",
            trigger: "numberOfRooms",
          },

          // Number of rooms value
          {
            id: "numberOfRooms",
            options: [
              { value: "1", label: "1", trigger: "priceMessage" },
              { value: "2-3", label: "2-3", trigger: "priceMessage" },
              { value: "3-4", label: "3-4", trigger: "priceMessage" },
              { value: "4-5", label: "4-5", trigger: "priceMessage" },
            ],
          },
          // Price message
          {
            id: "priceMessage",
            message: "טווח המחירים:",
            trigger: "price",
          },

          // Price value
          {
            id: "price",
            options: [
              {
                value: "6000",
                label: "עד ששת אלפים שח",
                trigger: "areaMessage",
              },
              {
                value: "8000",
                label: "עד שמונת אלפים שח",
                trigger: "areaMessage",
              },
              {
                value: "10000",
                label: "עד עשרת אלפים שח",
                trigger: "areaMessage",
              },
              {
                value: "20000",
                label: "עד עשרים אלפים שח",
                trigger: "areaMessage",
              },
            ],
          },
          // Area message
          {
            id: "areaMessage",
            message: "איזור מבוקש:",
            trigger: "area",
          },

          // Area value
          {
            id: "area",
            options: [
              {
                value: "הצפון הישן",
                label: "הצפון הישן",
                trigger: "pre-review",
              },
              {
                value: "הצפון החדש",
                label: "הצפון החדש",
                trigger: "pre-review",
              },
              { value: "לב העיר", label: "לב העיר", trigger: "pre-review" },
              { value: "פלורנטין", label: "פלורנטין", trigger: "pre-review" },
              { value: "שוק הכרמל", label: "שוק הכרמל", trigger: "pre-review" },
              { value: "רוטשילד", label: "רוטשילד", trigger: "pre-review" },
              {
                value: "כרם התימנים",
                label: "כרם התימנים",
                trigger: "pre-review",
              },
              {
                value: "יפו",
                label: "יפו",
                trigger: "pre-review",
              },
            ],
          },
          // Summary of the details
          {
            id: "pre-review",
            message: "נהדר! הנה סיכום של הפרטים שמלאת:",
            trigger: "review",
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update",
          },
          {
            id: "update",
            message: "האם ברצונך לעדכן שדה כלשהו?",
            trigger: "update-question",
          },
          // Update if nesscessry
          {
            id: "update-question",
            options: [
              { value: "yes", label: "כן", trigger: "update-yes" },
              { value: "no", label: "לא", trigger: "end-message" },
            ],
          },
          {
            id: "update-yes",
            message: "איזה שדה ברצונך לעדכן?",
            trigger: "update-fields",
          },
          {
            id: "update-fields",
            options: [
              {
                value: "numberOfRooms",
                label: "מספר החדרים",
                trigger: "update-rooms",
              },
              { value: "area", label: "איזור", trigger: "update-area" },
              { value: "price", label: "מחיר", trigger: "update-price" },
            ],
          },
          {
            id: "update-rooms",
            update: "numberOfRooms",
            trigger: "pre-review",
          },
          {
            id: "update-area",
            update: "area",
            trigger: "pre-review",
          },
          {
            id: "update-price",
            update: "price",
            trigger: "pre-review",
          },
          {
            id: "end-message",
            message:
              "תודה! הפרטים נקלטו בהצלחה. אנו נדאג לעדכן אותך כשיעלו דירות רלוונטיות לאתר. מאחלים לך הרבה הצלחה במציאת הדירה הבאה שלך🥰",
            end: true,
          },
          {
            id: "end-message-not",
            message:
              "תודה, צוות EasyRent מאחל לך בהצלחה במציאת הדירה הבאה שלך!",
            end: true,
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default ChatBotComp;
