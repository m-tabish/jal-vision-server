import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use 465 for SSL
  secure: false, // Set true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Function to send email
export const sendMail = async (to: string[], subject: string, body: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: to.join(','), // Recipients
    subject,
    html: body, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to.join(', ')}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
