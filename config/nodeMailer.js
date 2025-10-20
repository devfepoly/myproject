import nodemailer from "nodemailer"
import env from 'dotenv'
env.config();

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    service: process.env.SERVICE_MAIL,
    port: Number(process.env.PORT_MAIL),
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    },
})

export default transporter;
