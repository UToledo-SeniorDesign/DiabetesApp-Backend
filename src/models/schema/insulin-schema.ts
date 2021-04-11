import mongoose, { Schema } from 'mongoose';

import type { IInsulingSchema } from '../../types/schema-types';

const InsulinSchema: Schema = new Schema({
    creator:            { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    createdTime:        { type: Date, required: true },
    insulinDoseScale:   { type: String, required: true}
});

const InsulinModel = mongoose.model<IInsulingSchema>('Insulin', InsulinSchema);

export default InsulinModel;