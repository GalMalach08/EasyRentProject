import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItemText from "@material-ui/core/ListItemText";
import "./style.css";
const useStyles = makeStyles((theme) => ({
  root: { width: "80%", margin: "40px auto" },
  accordion: {
    backgroundColor: "rgb(34,38,42)",
    color: "white",
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className="header">
        <h1 className="qa_header">שאלות ותשובות</h1>
      </div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>מי אתם ?</Typography>
        </AccordionSummary>
        <AccordionDetails className="typography">
          <Typography>
            קוראים לי גל מלאך ואני מייסד EasyRent. האתר הוקם בשנת 2021 עקב
            המצוקה של אנשים רבים למצוא מגורים ראויים בתל אביב.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>מה היתרונות בלפתוח משתמש באתר ?</Typography>
        </AccordionSummary>
        <AccordionDetails className="typography">
          <Typography className={classes.typography}>
            ללא משתמש הדבר היחיד שאתם יכולים לעשות הוא להתסכל על הדירות שעלו
            לאתר. פתיחת משתמש תקנה לכם את היתרונות הבאים:
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon fontSize="small" color="disabled" />
                  </ListItemIcon>
                  <ListItemText primary="אפשרות להעלות נכסים לאתר בעצמכם" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon fontSize="small" color="disabled" />
                  </ListItemIcon>
                  <ListItemText primary="אפשרות לשיחה עם שלומי העוזר הדיגיטלי שלנו. בעזרתו תוכלו לסמן את ההעדפות שלכם למציאת דירה ואנו נדאג לעדכן אותכם ראשונים כאשר עולה דירה רלוונטית" />
                </ListItem>
              </List>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.typography}>
            איך מעלים נכס חדש לאתר ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="typography">
          <Typography>
            כאשר תפתחו משתמש תתווסף לכם לשונית בתפריט הניווט שנקראת "העלאת נכס".
            לאחר מכן תצטרכו למלא טופס קצר המציג את הדירה שלכם והיא תשלח לאישור
            מערכת. במידה והדירה תואשר היא תעלה לאתר ותקבלו על כך הודעה במייל
            איתו נרשמתם.
            <span>משם הדרך להשכרת הנכס קצרה מתמיד! </span>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.typography}>
            איך יוצרים איתכם קשר ?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="typography">
          <Typography className={classes.heading}>
            ניתן ליצור איתנו קשר באמצעים הבאים:
            <List dense={dense}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" color="disabled" />
                </ListItemIcon>
                <ListItemText primary="דרך האיימיל שלנו: galmalach2@gmail.com" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" color="disabled" />
                </ListItemIcon>
                <ListItemText primary="דרך הווצאפ במספר 0505920062" />
              </ListItem>
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
