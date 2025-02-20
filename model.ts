import mongoose, { Schema, Document } from "mongoose";

export interface IMeter extends Document {
  name: string;
  location: string;
  number: string;
}

const MeterSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  number: { type: String, required: true },
});

export default mongoose.model<IMeter>("Meter", MeterSchema);
