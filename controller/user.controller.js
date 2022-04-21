const express = require("express");

const {
  body,
  validationResult,
} = require("express-validator");


const User = require("../model/user.model");

const router = express.Router();

router.post(
  "/",
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
    body("pincode")
    .not()
    .isEmpty()
    .withMessage("Pincode cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Pincode must be at least 6 numbers")
    .isNumeric()
    .withMessage("Pincode must be a number"),
    body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number")
    .custom((value) => {
            if(value < 1  || value > 100){
                throw new Error("Incorrect age provided")
            }
            return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ err: err.message });
    }
  }
);

module.exports = router;