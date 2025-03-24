import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

const NoDataResponse = new NextResponse("Data missing", { status: 400 });

enum bodyFields {
  sender = "sender",
  subject = "subject",
  text = "text",
  html = "html",
}

const requiredFields = Object.entries(bodyFields).map(entry => entry[0])

export async function GET(request: Request) {
  return new NextResponse(`TEST 1 ${process.env.EMAIL}-${process.env.API_KEY}`);
}

export async function POST(request: Request) {

  let formData: FormData;
  try {
    formData = await request.formData();
    if (!formData || formData.values().next().done) {
      return NoDataResponse;
    }

    const reqEntries = Array.from(formData.entries())
      .filter(entry => requiredFields.includes(entry[0]));

    const emptyEntries = reqEntries
      .filter(entry => !entry[0]?.length)
      .map(entry => entry[0]);

    if (!reqEntries.length || emptyEntries.length >= 1) {
      return new NextResponse(`Missing fields: ("${emptyEntries.join('", "')}")`, { status: 400 });
    }
  } catch (error) {
    console.error(error)
    return NoDataResponse;
  }

  const emailData = {
    sender: formData.get(bodyFields.sender)?.toString(),
    subject: formData.get(bodyFields.subject)?.toString(),
    text: formData.get(bodyFields.text)?.toString(),
    html: formData.get(bodyFields.html)?.toString(),
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.API_KEY, // the app password Not your gmail password
    },
  });

  try {
    console.log(`sending email: ${JSON.stringify(emailData)}`)

    // const info = await transporter.sendMail({
    //   from: emailData.sender,
    //   to: process.env.EMAIL,
    //   subject: emailData.subject,
    //   text: emailData.text,
    //   html: emailData.html
    // });

    // console.log("Message sent: %s", info.messageId);

  } catch (error) {
    return new NextResponse("Something went wrong on the server", { status: 503 })
  }


  return Response.json({ message: 'Hello world' })
}