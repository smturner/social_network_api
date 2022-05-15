const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
}= require ('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend)
.delete(removeFriend);

module.exports = router;



// User.findOneAndUpdate({
//     _id: req.params.userId
// },
// {$pull: { friends: {userId: req.params.friendsId}}},
// { runValidators: true, new: true})
// .then((user) =>
// !user
// ? res.status(404).json({message: 'No user with that id!'})
// : res.json(thought))
// .catch((err) => res.status(500).json(err))
// })