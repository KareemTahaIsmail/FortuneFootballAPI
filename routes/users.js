const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();
const cors = require("cors");


router.get("/", cors(),(req, res, next) => {
  User.find()
    .select("_id userName password teamName balance squad transferPile")
    .exec()
    .then((users) => {
      if (users.length > 0) {
        res.status(200).json({
          numberOfUsers: users.length,
          users: users.map(user => {
              return {
                  id: user._id,
                  userName: user.userName,
                  balance: user.balance,
                  userPassword: user.password,
                  teamName: user.teamName,
                  squad: user.squad,
                  transferPile: user.transferPile
              }
          })
        });
      } else {
        res.status(200).json({
          message: "There are no users in the database.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
// router.get("/:userId", cors(), (req, res, next) => {
//   const id = req.params.userId;
//   User.findById(id)
//     .select("_id userName password teamName playerList")
//     .exec()
//     .then((user) => {
//       res.status(200).json({
//         id: user._id,
//         userName: user.userName,
//         userPassword: user.password,
//         teamName: user.teamName,
//         playerList: user.playerList,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.post("/", cors(),(req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    password: req.body.password,
    balance: req.body.balance,
    teamName: req.body.teamName,
    squad: req.body.squad,
    transferPile: req.body.transferPile
  });
  //this returns a promise
  user
    .save()
    .then((result) => {
      res.status(200).json({
        message: "User was added!",
        createdUser: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:userName', cors(), (req, res, next) => {
  const username = req.params.userName;
  User.findOne({"userName": username})
  .exec()
  .then(result => result.length===0 ? res.status(200).json(null) : res.status(200).json(result))
  .catch(err => res.status(500).json({error: err}))
})

router.patch("/:userId", cors(),(req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User was updated!",
        result: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User was deleted!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
