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
      return res.status(400).json({
        ok: false,
        msg: 'The user name or password is not correct.'
      });
    }
    
    // Validate Password
    const validatePassword = bcrypt.compareSync(password, user.password);

    if(!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'The user name or password is not correct.'
      });
    }

    res.status(200).json({
      ok: true,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }

}

const register = async(req, res = response) => {
  const {name, email, password: noCryptPassword} = req.body;

  try {

    const hasEmail = await User.findOne({
      where: {email}
    });

    if (hasEmail) {
      return res.status(400).json({
        ok: false,
        msg: `There is already a user with the email: ${email}`
      });
    }


    // Encrypt password
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(noCryptPassword, salt);

    const user = await User.create({name, email, password});
  
    res.status(202).json({
      ok: true,
      name: user.name,
      email: user.email
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }


}


module.exports = {
  login,
  register
}