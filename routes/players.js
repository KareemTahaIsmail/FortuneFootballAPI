const express = require('express');
const mongoose = require('mongoose');
const Player = require('../models/player');
const cors = require("cors");
const router = express.Router();

router.get('/', cors(),(req, res, next) => {
    Player.find()
    .select("_id name position rating level sellPrice image")
    .exec()
    .then(players => {
       if(players.length > 0){
        res.status(200).json({
            numberOfPlayers: players.length,
            players: players
        })
       } else{
           res.status(200).json({
               message: "There are no players in the database."
           })
       }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
})
// router.get('/:playerLevel', (req, res, next) => {
//     const level = req.params.playerLevel;
//     Player.find({"level": level})
//     .exec()
//     .then(result => res.status(200).json({
//         numberOfPlayers: result.length,
//         players: result
//     }))
//     .catch(err => res.status(500).json({error: err}))
// })
router.get('/:playerId', cors(),(req, res, next) => {
    const id = req.params.playerId;
    Player.findById(id)
    .select("_id name position rating level sellPrice image")
    .exec()
    .then(player => {
        if(player){
            res.status(200).json(player)
        }
        else{
            res.status(200).json({
                message: "No player exists with that ID."
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        position: req.body.position,
        rating: req.body.rating,
        level: req.body.level,
        sellPrice: req.body.sellPrice,
        image: req.body.image
    });
    //this returns a promise
    player.save()
    .then(result => {
        res.status(200).json({
            message: "Player was added!",
            createdPlayer: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

router.patch('/:playerId', cors(),(req, res, next) => {
    const id = req.params.playerId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Player.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Player was updated!",
            result: result
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        })
    })
})
router.delete('/:playerId', (req, res, next) => {
   const id = req.params.playerId;
   Player.remove({_id: id})
   .exec()
   .then(result => {
       res.status(200).json({
           message: "Player was deleted!"
       })
   })
   .catch(err => {
       res.status(500).json({
           error: err
       })
   })
})
router.delete('/', (req, res, next) => {
   
   Player.remove({}, [])
   .exec()
   .then(result => {
       res.status(200).json({
           message: "All players were deleted!"
       })
   })
   .catch(err => {
       res.status(500).json({
           error: err
       })
   })
})


module.exports = router;