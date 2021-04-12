import mongoose, { Schema } from 'mongoose';

import type { IMealSchema } from '../../types/schema-types';

const MealSchema: Schema = new Schema({
    name:       { type: String, required: true  },
    totCarbs:   { type: Number, required: true  },
    creator:    { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    foodItems:  { type: {
        name:   { type: String, required: true  },
        servingCarbs: { type: Number, required: true    },
        totServings: { type: Number, required: true  },
        brand: {type: String, require: false    }
    },required: true}
    // createdTime: { type: Date, required: true   }
});

const MealModel = mongoose.model<IMealSchema>('Meal', MealSchema);

export default MealModel;