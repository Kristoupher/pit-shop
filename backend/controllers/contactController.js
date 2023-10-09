import asyncHandler from "../middleware/asyncHandler.js";
import main from "../utils/sendMail.js";

const sendEmail = asyncHandler(async (req, res) => {
    const { fullname, mail, subject, message } = req.body;
    console.log(fullname, mail, subject, message);

    await main(fullname, mail, subject, message);

    res.status(200).json({ message: "Email envoyé" });
});

export { sendEmail };