import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import type { IMealSchema } from '../../types/schema-types';

const MealSchema: Schema = new Schema({
    name:       { type: String, required: true  },
    totCarbs:   { type: Number, required: true  },
    foodItems:  [{ type: mongoose.Types.ObjectId, required: true, ref: 'FoodItem'   }],
    creator:    { type: mongoose.Types.ObjectId, required: true, red: 'User'        },
    createdTime: { type: Date, required: true   }
});

const MealModel = mongoose.model<IMealSchema>('Meal', MealSchema);

export default MealModel;