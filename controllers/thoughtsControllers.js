const { Thoughts, User} = require('../models');

module.exports = {
    getThoughts (req,res) {
        Thoughts.find()
        .then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },
    // createThoughts(req,res) {
    //     Thoughts.create(req.body)
    //     // .then((thought) => {
    //     //     return User.findOneAndUpdate(
    //     //         {_id: req,body.userId }, 
    //     //         {$addToSet: {
    //     //             though
    //     //         }}
    //     //     )
    //     }).then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    // },
   
//     updateThought,
//     removeThought,getSingleThought,
//     deleteReaction,
//     createReaction
}