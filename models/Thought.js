const {Schema, model} = require ('mongoose');

const thoughtSchema = new Schema ( {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    // reactions: [Reaction],
    users: [
        {
            type:Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// thoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
