import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, name, file } = await request.json();
  // console.log("payload from route", email, name, file)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // providerauth: {user: process.env.MY_EMAIL},
    // pass: process.env.MY_PASSWORD,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: `Purchased code snippets from code-4all by ${name}`,
    text: `Here are the links to your code snippets \n ${file}`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          // console.log('an error occured', err.message)
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    // console.log('from route', err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}