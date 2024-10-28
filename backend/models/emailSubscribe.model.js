import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const emailModel =
  mongoose.models.EmailSubscriber || mongoose.model("EmailSubscriber", emailSchema);
export default emailModel;
