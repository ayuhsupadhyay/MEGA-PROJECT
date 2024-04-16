const mongoose = require("mongoose");
const maileSender = require("../utilities/mailSender");
const emailTemplate = require("../mail/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60*1000 // 5 minutes
    }
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await maileSender(email, "Verification mail by StudyNotion", emailTemplate(otp));
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        // Handle the error appropriately, such as logging or throwing
        throw error;
    }
}

// Pre-save middleware
OTPSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            console.log("New document saved to database");
            await sendVerificationEmail(this.email, this.otp);
           // ("email is being send ... wait for a while ")
        } catch (error) {
            // Handle any error that might occur during email sending
            console.error("Error occurred in pre-save middleware: ", error);
            // Pass the error to the next middleware or route handler
            return next(error);
        }
    }
    // Call next to continue with the save operation
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
