import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";

// export const sendEmail = async (email, subject, emailContent, res, message) => {
//   try {
//     // Nodemailer configuration
//     let config = {
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_APP_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     };

//     console.log(" Config for send Email :  ", config)

//     let transporter = nodemailer.createTransport(config);

//     // Mailgen configuration
//     let MailGenerator = new Mailgen({
//       theme: "default",
//       product: {
//         name: "Job Portal",
//         link: "https://mailgen.js/",
//       },
//     });

//     // Generate email body using Mailgen
//     let mailBody = MailGenerator.generate(emailContent);

//     // Email message
//     let messageOptions = {
//       from: process.env.GMAIL_APP_USER,
//       to: email,
//       subject: subject,
//       html: mailBody,
//     };

//     // Send the email
//     const info = await transporter.sendMail(messageOptions);

//     res.status(200).json({
//       success: true,
//       message: message || "Email sent successfully!",
//       emailInfo: info.messageId,
//       preview: nodemailer.getTestMessageUrl(info),
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, message: "Email sending failed!" });
//   }
// };


export const sendEmail = async (email, subject, emailContent) => {
    try {
      let config = {
        service: "gmail",
        auth: {
          user: process.env.GMAIL_APP_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      };

      console.log(" Config for send Email :  ", config)
  
      let transporter = nodemailer.createTransport(config);
  
      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Job Portal",
          link: "https://localhost:5173/",
        },
      });
  
      let mailBody = MailGenerator.generate(emailContent);
  
      let messageOptions = {
        from: process.env.GMAIL_APP_USER,
        to: email,
        subject: subject,
        html: mailBody,
      };
  
      // Send the email
      const info = await transporter.sendMail(messageOptions);
  
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }
  };


export const sendEmailContent = (user, resetCode) => {
    const emailContent = {
        body: {
          name: user.firstName,
          intro: `
            <div style="background-color:#f4f4f4; padding: 20px; border-radius: 10px;">
              <h2 style="color: #2D89EF; text-align: center;">🔒 Password Reset Request</h2>
              <p style="font-size: 16px; text-align: center;">
                Hello <strong>${user.firstName}</strong>, we received a request to reset your password.
              </p>
              <p style="font-size: 16px; text-align: center;">
                Use the verification code below to reset your password.
              </p>
            </div>
          `,
          action: {
            instructions: `
              <div style="text-align: center; font-size: 18px; margin-top: 10px;">
                <strong>Your Verification Code:</strong>
              </div>
              <div style="
                background-color: #2D89EF; 
                color: #fff;
                font-size: 24px; 
                font-weight: bold; 
                padding: 10px; 
                border-radius: 5px;
                text-align: center;
                width: fit-content;
                margin: 10px auto;">
                ${resetCode}
              </div>
              <p style="font-size: 14px; text-align: center; color: #555;">
                This code is valid for <strong>10 minutes</strong>.
              </p>
            `,
            button: {
              color: "#22BC66",
              text: "Reset Password",
              link: "http://localhost:5173/verifycode",
            },
          },
          outro: `
            <div style="text-align: center; font-size: 14px; color: #555; margin-top: 20px;">
              If you did not request this, please ignore this email or contact support.
            </div>
            <div style="text-align: center; margin-top: 10px;">
              <a href="mailto:support@yourjobportal.com" style="color: #2D89EF; text-decoration: none; font-weight: bold;">
                Contact Support
              </a>
            </div>
          `,
        },
      };

      return emailContent
      
}
  


export const sendJobApprovalEmailContent = (user, job, adminApproval, reasonForRejection = "") => {
  const isApproved = adminApproval === true;
  const statusColor = isApproved ? "#22BC66" : "#E74C3C";
  const statusText = isApproved ? "APPROVED" : "REJECTED";
  const introText = isApproved
    ? `<p style="font-size: 16px; text-align: center;">
        Congratulations <strong>${user.firstName}</strong>, your job posting <strong>"${job.title}"</strong> has been <span style="color:${statusColor}; font-weight:bold;">APPROVED</span> by the admin.
      </p>`
    : `<p style="font-size: 16px; text-align: center;">
        Hello <strong>${user.firstName}</strong>, unfortunately your job posting <strong>"${job.title}"</strong> has been <span style="color:${statusColor}; font-weight:bold;">REJECTED</span> by the admin.
      </p>`;

  const rejectionReason = !isApproved && reasonForRejection
    ? `<div style="background-color:#fff3cd; color:#856404; border-radius:6px; padding:12px 20px; margin:20px 0; text-align:center;">
        <strong>Reason for Rejection:</strong><br/>${reasonForRejection}
      </div>`
    : "";

  const actionButton = isApproved
    ? {
        color: "#22BC66",
        text: "View Job Posting",
        link: `http://localhost:5173/job/${job._id}`,
      }
    : {
        color: "#E74C3C",
        text: "Edit & Resubmit Job",
        link: `http://localhost:5173/job/edit/${job._id}`,
      };

  const emailContent = {
    body: {
      name: user.firstName,
      intro: `
        <div style="background-color:#f4f4f4; padding: 20px; border-radius: 10px;">
          <h2 style="color: ${statusColor}; text-align: center;">📢 Job Approval Update</h2>
          ${introText}
          ${rejectionReason}
        </div>
      `,
      action: {
        instructions: `
          <div style="text-align: center; font-size: 18px; margin-top: 10px;">
            <strong>Job Status: <span style="color:${statusColor};">${statusText}</span></strong>
          </div>
        `,
        button: actionButton,
      },
      outro: `
        <div style="text-align: center; font-size: 14px; color: #555; margin-top: 20px;">
          If you have questions, please contact our support team.
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <a href="mailto:support@yourjobportal.com" style="color: #2D89EF; text-decoration: none; font-weight: bold;">
            Contact Support
          </a>
        </div>
      `,
    },
  };

  return emailContent;
};