const router = require('express').Router();

const{
    getThoughts,
    createThoughts,
    updateThought,
    removeThought,
getSingleThought,
//     deleteReaction,
    createReaction
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getThoughts)
.post(createThoughts);

router.route('/:thoughtsId')
.get(getSingleThought)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtsId/reactions')
// .post(createReaction)
// .delete(deleteReaction);

module.exports = router;

