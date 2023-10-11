import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
//Envoie du mail
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'kri.arregui@gmail.com',
            pass: process.env.GOOGLE_PWD,
        }
    });

    async function main(fullname, mail, subject, message) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Le Pit Shop" <pitshop@webmaster.com>',
            to: "kri.arregui@gmail.com",
            subject: "Vous avez reçu un nouveau message",
            text: "Hello world?",
            html: `<b>Vous avez reçu un message de ${fullname}</b>
            <p><strong>Adresse email:</strong> ${mail}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>        
    `,
        });

        return 'Votre message a bien été envoyé';
    }

export default main;