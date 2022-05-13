const { Thoughts, User } = require('../models');
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
    getSingleThought(req,res) {
        Thoughts.findOne({_id: req.params.thoughtsId})
        .then((thought) => !thought ? res.status(404).json({message: 'No thought with that ID exists'})
        : res.json(thought)
        ) 
        .catch((err) => res.status(500).json(err));
    },
        updateThought(req, res) {
            Thoughts.findOneAndUpdate({_id: req.params.thoughtId},
                {$set: req.body},
                {new: true}
                )
                .then((thought) => !thought 
                ? res.status(400).json({
                    message: "No thought with this id"
                })
                : res.json(thought)
                )
        }
        // removeThought(req, res) {
        //     console.log(req.params)

        //     Thoughts.findOneAndUpdate(
        //         {_id: req.params.thoughtsId},
        //         {})
        //     .then((thought) =>
        //     !thought ? res.status(400).json({
        //         message:'No thought with this id!'
        //     })
        //     : res.json(thought)
        //     )
        //     .catch((err) => {
        //         console.log(err);
        //         res.status(500).json(err)
        //     })

        // },
    // getSingleThought,
    //     deleteReaction,
    //     createReaction
}