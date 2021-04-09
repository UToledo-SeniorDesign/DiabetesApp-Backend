import mongoose, { Schema } from 'mongoose';

import type { IFoodItemSchema } from '../../types/schema-types';

const FoodItemSchema: Schema = new Schema({
    name:           { type: String, required: true  },
    servingCarbs:   { type: Number, required: true  },
    totServings:    { type: Number, required: true  }
});

const FoodItemModel = mongoose.model<IFoodItemSchema>('FoodItem', FoodItemSchema);

export default FoodItemModel;