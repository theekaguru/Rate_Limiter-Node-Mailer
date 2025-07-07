import nodemailer from "nodemailer"

//create  test account for a transporter 

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user:'	keira.weissnat16@ethereal.email',
        pass:'BBYyXbpjM3DR8VNAvv'
    }
});

/*
//callback fn

transporter.verify((success , error)  => {
   if(error){
    console.log(error)
   } else{
    console.log('server is ready to take our messages')
   }
})
 */

(async() =>{
    const info = await transporter.sendMail({
        from: '"Keira Weissnat"  <keira.weissnat16@ethereal.email>' ,
        to :"danielkaguru2001@gmail.com",
        subject: "Hello 🫡",
        text:"Hey You My G",
        html: "<b>Hey You </b>"
    });
    console.log ("message sent:" , info.messageId)
})()