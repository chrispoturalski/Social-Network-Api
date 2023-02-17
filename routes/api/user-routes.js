
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {
    User.find({}, (err, users) => {
        res.status(200).json(users)
        console.log(err)
    });
});

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', (req,res)=> {
    User.create(
        {
            username: req.body.username,
            email: req.body.email
        },
        (err, user) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(user);
            }
        }   
    )
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.status(500).json("No user found");
        } else {
            res.status(200).json(user);
        }
    }
    )
})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', (req,res)=> {
    User.findByIdAndUpdate(req.params.userId, 
        {
            username: req.body.username,
            email: req.body.email
        },
        (err, user) => {
            if (err) {
                res.status(500).json("No user found");
            } else {
                res.status(200).json(user);
            }
        }
    )
})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {
    User.findByIdAndDelete(req.params.userId, (err, user) => {
        if (err) {
            res.status(500).json("No user found");
        } else {
            res.status(200).json(user);
        }
    }
    )
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', async (req,res)=> {
    await User.findByIdAndUpdate(req.params.userId, 
        {
            $push: {friends: req.params.friendId}
        }
    )
    await User.findByIdAndUpdate(req.params.friendId, 
        {
            $push: {friends: req.params.userId}
        },
        
    ); res.status(200).json("Friend added")

})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', async (req,res)=> {
    await User.findByIdAndUpdate(req.params.userId, 
        {
            $pull: {friends: req.params.friendId}
        }
    )
    await User.findByIdAndUpdate(req.params.friendId, 
        {
            $pull: {friends: req.params.userId}
        },
        
    ); res.status(200).json("Friend deleted")

});

module.exports = router;
