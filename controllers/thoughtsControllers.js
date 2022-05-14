const { Thoughts, User, Reaction } = require('../models');
const ObjectId = require('mongoose').Types;

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate({ _id: req.body.userId },
                    {
                        $addToSet: {
                            thoughts: thoughts._id
                        }
                    },
                    {
                        new: true
                    }
                );
            })
            .then((user) => !user ? res.status(404).json({
                message: 'Thought created, but found no user with that ID'
            })
                : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID exists' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) => !thought
                ? res.status(400).json({
                    message: "No thought with this id"
                })
                : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    removeThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
            .then((thought) => {
                !thought ? res.status(404).json({
                    message: 'No thought with this id!'
                })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtsId },
                        { $pull: { thoughts: req.params.thoughtsId } },
                        { new: true }
                    )
                        .then((user) => {
                            !user
                                ? res.status(404).json({ message: "No user was found" })
                                : res.json({ message: 'Removed thought and updated user' })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json(err)


                        })
            })
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            {$addToSet: { reactions: req.body }},
            { runValidators: true, new: true},
        )
            .then((reaction) => 
            !reaction 
            ? res.status(404).json({
                message: 'Reaction created, but no thought found with that ID'
            })
                : res.json(reaction)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },


    deleteReaction (req, res) {
        Thoughts.findOneAndUpdate ({
            _id: req.params.thoughtsId
        },
        {$pull: { reactions: {reactionId: req.params.reactionId}}},
        { runValidators: true, new: true })
        .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No thought with that id!'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

}
