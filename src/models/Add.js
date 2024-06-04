const { Schema, models, model } = require("mongoose");

const addSchema = new Schema(
  {
    title: String,
    price: Number,
    description: String,
    contact: String,
    category: String,
    files: Array,
    location: Object,
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

addSchema.index({ location: "2dsphere" });

export const AddModel = models?.Add || model("Add", addSchema);
