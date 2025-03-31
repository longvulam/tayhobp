import { bodyFields, emailData } from '@/app/Types';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';


const NoDataResponse = new NextResponse("Data missing", { status: 400 });

const requiredFields = Object.entries(bodyFields).map(entry => entry[0])

const createTransporter = () => nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.API_KEY, // the app password Not your gmail password
  },
});


const sendEmail = async (emailData: emailData): Promise<SMTPTransport.SentMessageInfo> => {
  const info = await createTransporter().sendMail({
    from: emailData.sender,
    to: process.env.EMAIL,
    subject: emailData.subject,
    text: emailData.text,
    html: emailData.html
  });

  return info;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const oolong = searchParams.get('oolong');

  if (oolong !== process.env.TESTPW) {
    return new NextResponse("TEST OK");
  }

  

  const emailData = {
    sender: "masquadel@gmail.com",
    subject: "test subject",
    text: "test text",
    html: "<div style='color:blue;'>test html</div>",
  }
  try {
    console.log(`sending email: ${JSON.stringify(emailData)}`)

    const transInfo = await sendEmail(emailData);

    console.log("Message sent: %s", transInfo.messageId);
    return Response.json({ message: `"Message sent: ${transInfo.messageId}` })
  } catch (error) {
    return new NextResponse("Something went wrong on the server", { status: 503 })
  }
  // return new NextResponse(`TEST ${process.env.EMAIL}`);
}

export async function POST(request: NextRequest) {

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


  try {
    console.log(`sending email: ${JSON.stringify(emailData)}`)

    const transInfo = await sendEmail(emailData);

    console.log("Message sent: %s", transInfo.messageId);
    return Response.json({ message: `"Message sent: ${transInfo.messageId}` })
  } catch (error) {
    return new NextResponse("Something went wrong on the server", { status: 503 })
  }
}