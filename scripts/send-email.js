const emailjs = require("@emailjs/nodejs");

async function sendEmail({ status, message, details }) {
    try {
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
                status,
                status_color: status === "SUCCESS"
                    ? "#16a34a"
                    : "#dc2626",
                message,
                project_name: "Supabase",
                workflow_name: "Supabase Keep Alive",
                execution_time: new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata"
                }),
                details,
                workflow_url:
                    `https://github.com/${process.env.NAME_OF_GITHUB_REPOSITORY}/actions`
            },
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
        );

        console.log("Email sent:", response.status);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}

module.exports = sendEmail;
