const nodemailer=require("nodemailer");


const maileSender=async(email,title,body)=>{
    try {
        let transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,

            } 

        })
        let info=await transporter.sendMail({
            from:`studyMotion|| codehelp-by Ayush Upadhyay`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info); 
        return info;
    } catch (error) {
        console.log(error.message);

        
    }
}
module.exports=maileSender;