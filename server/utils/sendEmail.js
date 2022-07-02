const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const Mailgen = require("mailgen");
require("dotenv").config();

console.log(process.env.EMAIL_USER);

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

// Send email to reset the password
const sendResetPasswordEmail = async (userEmail, firstname, lastname) => {
  try {
    const password = Math.random().toString(36).slice(2);

    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: "rtl",
      product: {
        name: "EasyRent",
        link: `${process.env.EMAIL_MAIN_URL}5`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: `<h2>עדכון סיסמה עבור ${firstname} ${lastname}</h2>`,
        action: {
          instructions: `
          <h3>סיסמתך החדשה לאתר EasyRent היא ${password}</h3>`,
          button: {
            color: "#22BC66",
            text: "לחץ על מנת להתחבר לאתר",
            link: `${process.env.EMAIL_MAIN_URL}signin`,
          },
        },
        outro: "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
      password,
    };
  } catch (error) {
    throw error;
  }
};

// Send to all users that their preferences are equal to asset that uploaded
const sendRelevantAssetEmail = async (userEmail, asset, name) => {
  try {
    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: "rtl",
      product: {
        name: "EasyRent",
        link: `${process.env.EMAIL_MAIN_URL}5`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: `<h2>שלום ${name} מצאנו עבורך נכס רלוונטי שעלה לאתר</h2>`,
        action: {
          instructions: `
          <h3>הנכס נמצא בכתובת ${asset.address}, כולל ${asset.roomsNumber} חדרים ובמחיר של ${asset.pricePerMonth} לחודש</h3>`,
          button: {
            color: "#22BC66",
            text: "כנס לקישור על מנת לקבל פרטים נוספים",
            link: `${process.env.EMAIL_MAIN_URL}asset/${asset._id}`,
          },
        },
        outro: "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

// Send when the asset is approved
const sendAssetApprovedEmail = async (userEmail, asset, name) => {
  try {
    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: "rtl",
      product: {
        name: "EasyRent",
        link: `${process.env.EMAIL_MAIN_URL}5`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: `<h2>שלום ${name} הנכס שלך הועלה בהצלחה לאתר EasyRent </h2> `,
        action: {
          instructions: ` 
          <h3>הנכס ברחוב ${asset.address} שעלה לאתר שלנו נבדק ואושר</h3>
          <h3>כעת כל גולשינו יהיה חשופים אליו ואנחנו בטוחים שתצליח להשכיר אותו במהרה</h3>
          <h5>בברכה, צוות EasyRent</h5>`,
          button: {
            color: "#22BC66",
            text: "כנס לקישור על מנת לצפות בנכס",
            link: `${process.env.EMAIL_MAIN_URL}asset/${asset._id}`,
          },
        },
        outro: "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

// Send when the asset is approved
const sendVerificationMail = async (userEmail, name, token) => {
  try {
    console.log(userEmail, name, token);
    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: "rtl",
      product: {
        name: "EasyRent",
        link: `${process.env.EMAIL_MAIN_URL}5`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: `<h2>שלום ${name} וברוכה הבאה לEasyRent </h2> `,
        action: {
          instructions: ` 
          
          <h3> לחץ כאן על מנת לאמת את החשבון שלך </h3>
          <h5>בברכה, צוות EasyRent</h5>`,
          button: {
            color: "#22BC66",
            text: "אמת את חשבונך",
            link: `${process.env.EMAIL_MAIN_URL}user/verification?t=${token}`,
          },
        },
        outro: "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendResetPasswordEmail,
  sendRelevantAssetEmail,
  sendAssetApprovedEmail,
  sendVerificationMail,
};
