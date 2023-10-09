import  dotenv from 'dotenv';
import { Resend } from "resend";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
    try {
        const data = await resend.emails.send({
            from: 'Le Pit Shop <pitshop@resend.dev>',
            to: ['kri.arregui@gmail.com'],
            subject: 'Hello World',
            html: '<strong>It works!</strong>',
        });

        console.log(data);
    } catch (error) {
        console.error(error);
    }
})();