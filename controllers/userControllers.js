const { User } = require('../models/');

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .then((user) => res.json(user))
            .catch((err) => {
                console.error({ message: err });
                res.status(500)
                    .json(err)
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500)
                .json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .then((user) => !user
                ? res.status(404).json({ message: 'No user with that ID exists' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) => !user
                ? res.status(400).json({
                    message: 'No user with this id!'
                })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => !user ? res.status(400).json({
                message: 'No user with this id!'
            })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            {$addToSet: { friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
            .populate('friends')
            .then((friends) => {
            !friends
            ? res.status(404).json({message: 'Friend added, but no user found with that Id'})
            : res.json('Friend Added')
            // res.json("Friend Added"))
             }).catch((err) =>{ res.status(500).json(err)});
    },

    removeFriend (req, res) {
       
            

     

    }
}