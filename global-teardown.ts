import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from Credential.env
dotenv.config({ path: path.resolve(__dirname, 'Credential.env') });

export default async function globalTeardown() {
  await sendTestReport();
}

async function sendTestReport() {
  const reportPath = path.resolve(__dirname, 'test-report', 'index.html'); // Path to the generated HTML report

  // Check if the report exists
  if (!fs.existsSync(reportPath)) {
    console.error('Test report not found!');
    return;
  }

  // Create a nodemailer transporter with Gmail SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,         // SMTP host (Gmail: smtp.gmail.com)
    port: Number(process.env.SMTP_PORT), // SMTP port (465 for SSL)
    secure: true,                        // Use SSL for Gmail
    auth: {
      user: process.env.SMTP_USER,       // Your Gmail email
      pass: process.env.SMTP_PASS,       // Your Gmail app password
    },
  });

  // Email content and attachment
  const mailOptions = {
    from: `"Playwright Test Results" <${process.env.SMTP_USER}>`, // Sender address
    to: process.env.TO_EMAIL,                                    // Recipient email
    subject: 'Playwright Test Execution Report',                 // Email subject
    text: 'Please find the attached test execution report.',     // Email body
    attachments: [
      {
        filename: 'TestReport.html',
        path: reportPath,                                         // Attach the HTML report
      },
    ],
  };

  try {
    // Send email with the test report
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}
