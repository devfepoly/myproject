import transporter from "../../config/nodeMailer.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function resetPasswordMail (urlVerify, email, subject) {
    try {
        const emailTemplatePath = path.join(__dirname, "..", "..", "views", "mail", "resetPasswordSendingMail.ejs");
        const html = await ejs.renderFile(emailTemplatePath, { urlVerify });
        
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject,
            html
        });
    } catch (error) {
        console.log(error);
    }
}