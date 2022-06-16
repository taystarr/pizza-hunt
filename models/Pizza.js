const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    // need to tell schema it can use virtuals
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// get total count of comments and replies using virtuals
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;