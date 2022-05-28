const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const login = async(req, res = response) => {
  const {email, password} = req.body;

  try {

    const user = await User.findOne({
      where: {email}
    });

    if (!user) {
      res.status(400).json({
        msg: 'The username or password is not correct.'
      });
    }
    
    // Validate Password
    const validatePassword = bcrypt.compareSync(password, password);

    if(!validatePassword) {
      return res.status(400).json({
        msg: 'The username or password is not correct.'
      });
    }

    res.status(200).json({
      name: user.name
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Please talk to the admin.'
    });
  }

}

const register = async(req, res = response) => {
  const {name, email, password} = req.body;

  try {

    const user = await User.findOne({
      where: {email}
    });

    if (user) {
      return res.status(400).json({
        msg: `There is already a user with the email: ${email}`
      });
    }


    // Encrypt password
    const salt = bcrypt.genSaltSync();
    const cryptPassword = bcrypt.hashSync(password, salt);

    user = await User.create({name, email, cryptPassword});
  
    res.status(202).json(user);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Please talk to the admin.'
    });
  }


}


module.exports = {
  login,
  register
}