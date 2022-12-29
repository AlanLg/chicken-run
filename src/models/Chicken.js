import { Schema, model } from 'mongoose';

const chickenSchema = new Schema({
	name: { type: String, required: true },
	birthday: { type: Date, default: Date.now },
	weight: { type: Number, required: true },
	steps: { type: Number, default: 0 },
	isRunning: { type: Boolean, default: false },
});

export default model('Chicken', chickenSchema);

