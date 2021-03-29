import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import type { IFoodItemSchema } from '../../types/schema-types';

const FoodItemSchema: Schema = new Schema({
    name:           { type: String, required: true  },
    servingCarbs:   { type: Number, required: true  },
    totServings:    { type: Number, required: true  }
});

FoodItemSchema.plugin(uniqueValidator);     // Query email faster and makes sure that emails are unique

const FoodItemModel = mongoose.model<IFoodItemSchema>('FoodItem', FoodItemSchema);

export default FoodItemModel;