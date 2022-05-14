const router = require('express').Router();

const{
    getThoughts,
    createThoughts,
    updateThought,
    removeThought,
getSingleThought,
//     deleteReaction,
    addReaction
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getThoughts)
.post(createThoughts);

router.route('/:thoughtsId')
.get(getSingleThought)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtsId/reactions')
.post(addReaction)
// .delete(deleteReaction);

module.exports = router;

