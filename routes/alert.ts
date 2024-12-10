import express from 'express';
import { PrismaClient } from '@prisma/client';
import { sendMail } from '..//utils/email';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/alerts', async (req, res) => {
  const {
    state,
    district,
    tehsilBlock,
    name,
    villageName,
    siteName,
    latitude,
    longitude,
    wellSiteType,
    waterLevel,
    alertType,
    alertMessage,
  } = req.body;

  try {
    // Save the alert to the database
    const newAlert = await prisma.alert.create({
      data: {
        state,
        district,
        tehsilBlock,
        name,
        villageName,
        siteName,
        latitude,
        longitude,
        wellSiteType,
        waterLevel,
        alertType,
        alertMessage,
      },
    });

    // Prepare email recipients
    const recipients = ['kaustubhpandey44@gmail.com','shrinjayshresth@gmail.com','hsinghlko03@gmail.com']; // Replace with actual emails

    // Compose email content
    const subject = `Alert: ${alertType} detected at ${siteName}`;
    const body = `
      <h1>Anomaly Detected</h1>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>District:</strong> ${district}</p>
      <p><strong>Site Name:</strong> ${siteName}</p>
      <p><strong>Alert Type:</strong> ${alertType}</p>
      <p><strong>Message:</strong> ${alertMessage}</p>
      <p><strong>Location:</strong> Lat ${latitude}, Long ${longitude}</p>
    `;

    // Send email notification
    await sendMail(recipients, subject, body);
    // await sendMsg(recipients,subject ,body);

    res.status(201).json({ message: 'Alert created and email notifications sent.', alert: newAlert });
  } catch (error) {
    console.error('Error processing alert:', error);
    res.status(500).json({ error: 'Failed to process alert.' });
  }
});

export default router;
