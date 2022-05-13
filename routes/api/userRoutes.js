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

// router.route('/:userId/friends').post(addFriend);

// router.route('/:userId/:friendId').delete(removeFriend)

module.exports = router;

