import nodemailer from "nodemailer"
import dotenv from "dotenv";
import { info } from "console";
import { text } from "stream/consumers";

dotenv.config()

//create the transporter 

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    secure:true,
    auth:{
        user:process.env.EMAIL_SENDER,
        pass:process.env. EMAIL_PASSWORD
    }
});
/*
 transporter.sendMail({
    from:`My NodeMailer ${process.env.EMAIL_SENDER}`,
    to:'kagurups@gmail.com',
    subject:"Test Email",
    text:"Hello from your SMTP MAILER"
},(err,info) =>{
    if(err) return console.error(err);
    console.log('Email Sent:', info.response)
})

*/
export const SendNotificationEmail =(email:string,subject:string,message:string) =>{
    try {
        const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    secure:true,
    auth:{
        user:process.env.EMAIL_SENDER,
        pass:process.env. EMAIL_PASSWORD
    }
});

   const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to:email,
    subject:subject,
    text:`${message}\n`,
    html:``
   }
    } catch (error) {
        
    }
}