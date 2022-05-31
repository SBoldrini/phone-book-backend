const { response } = require('express');
const Contact = require('../models/contact');


const newContact = async(req, res = response) => {
  const {firstName, lastName, phone} = req.body;

  try {
    const contact = await Contact.create({firstName, lastName, phone});

    res.status(202).json({
      ok: true,
      contact
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }
}

const getContacts = async(req, res = response) => {

  
  try {
    const [total, contacts] = await Promise.all([
      Contact.count(),
      Contact.findAll({
        order: [
          ['firstName', 'ASC']
        ]
      })
    ]);

    

    res.status(200).json({
      total,
      contacts
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }

} 

const getContact = async(req, res = response) => {
  const {id} = req.params;

  try {
    
    const contact = await Contact.findByPk(id);
  
    if (contact) {
      res.status(200).json({
        ok: true,
        contact
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: `There isn't contact with the id: ${id}`
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }


}

const updateContact = async(req, res = response) => {
  const {id} = req.params;
  const data = req.body;

  try {

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        ok: false,
        msg: `There isn't contact with the id: ${id}`
      });
    }

    await contact.update({...data});
  
    if (contact) {
      res.status(200).json({
        ok: true,
        contact
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: `There isn't contact with the id: ${id}`
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the admin.'
    });
  }

}

const deleteContact = async(req, res = response) => {
  const {id} = req.params;

  try {

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({
        ok: false,
        msg: `There isn't contact with the id: ${id}`
      });
    }

    const deleteContact = contact;

    await contact.destroy();
    res.status(200).json({
      ok: true,
      deleteContact
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
  newContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
}