
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req,res)=> {
    Thought.find({}, (err, thoughts) => {
        res.status(200).json(thoughts)
    }).populate({
        path: 'reactions',
        select: '-__v'
    });
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', (req,res)=> {
    Thought.create(
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        },
        (err, thoughts) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(thoughts);
            }
        }   
    )
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req,res)=> {
    Thought.findById(req.params.thoughtId, (err, thoughts) => {
        if (err) {
            res.status(500).json("No thought found");
        } else {
            res.status(200).json(thoughts);
        }
    }
    )
})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId', (req,res)=> {
    Thought.findByIdAndUpdate(req.params.thoughtId, 
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        },
        (err, thoughts) => {
            if (err) {
                res.status(500).json("No thought found");
            } else {
                res.status(200).json(thoughts);
            }
        }
    )
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {
    Thought.findByIdAndDelete(req.params.thoughtId, (err, thoughts) => {
        if (err) {
            res.status(500).json("No thought found");
        } else {
            res.status(200).json(thoughts);
        }
    })
});




//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req,res)=> {
    const reaction = await Reaction.create(
        {
            reactionBody: req.body.reactionBody,
            username: req.body.username
        },
    )
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true, runValidators: true }
    )
    .then((thoughts) => 
        !thoughts
        ? res.status(404).json({ message: 'No thought found with this id!' })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
});     

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
//router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {
//     Thought.findByOneAndUpdate(req.params.thoughtId,
//         {
//             $pull: { reactions: {reactionId: req.params.reactionId} }
//         },
//         (err, thoughts) => {
//             if (err) {
//                 res.status(500).json("No thought found");
//             } else {
//                 res.status(200).json(thoughts);
//             }
//         }
//     )
// });

module.exports = router;
