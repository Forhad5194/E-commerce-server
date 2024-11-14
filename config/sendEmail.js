import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
    console.log("Please provide Resend API keys In env file. ");
}

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }


        return data
    } catch (error) {
        console.log(error);

    }
}
