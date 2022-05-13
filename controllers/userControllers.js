const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500)
                .json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500)
                .json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
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

    // addFriend(req, res) {
    //     User.
    // }
    // removeFriend,
}