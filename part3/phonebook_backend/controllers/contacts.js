const contactsRouter = require("express").Router();
const { error } = require("../utils/logger");
const Contact = require("../models/contact");

// **************** GET - Phonebook Info ****************
contactsRouter.get("/info", async (req, res) => {
  await Contact.find({})
    .then(contacts => {
      res.json({
        p: `Phonebook has info for ${contacts.length} people`,
        d: new Date().toString()
      });
    })
    .catch(err => error(`Could not fetch contacts: ${err.message}`));
});

// **************** GET - Fetch ALL Contacts ****************
contactsRouter.get("/", async (req, res) => {
  await Contact.find({})
    .then(contacts => res.json(contacts))
    .catch(err => error(`Could not fetch contacts: ${err.message}`));
});

// **************** GET - Fetch Contact by ID ****************
contactsRouter.get("/:id", async (req, res, next) => {
  await Contact.findById(req.params.id)
    .then(contact => {
      if (!contact) res.status(404).end();
      res.json(contact);
    })
    .catch(err => next(err));
});

// **************** POST - Create a New Contact ****************
contactsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  let contacts;
  await Contact.find({})
    .then(data => (contacts = data))
    .catch(err => error(`Could not fetch contacts: ${err.message}`));

  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  } else if (contacts.find(c => c.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  });

  await contact
    .save()
    .then(result => res.json(result))
    .catch(error => next(error));
});

// **************** PUT - Edit/Update an Existing Contact ****************
contactsRouter.put("/:id", (request, response, next) => {
  const { name, number } = request.body;

  Contact.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then(updatedContact => {
      response.json(updatedContact);
    })
    .catch(error => next(error));
});

// **************** DELETE - Delete an Existing Contact ****************
contactsRouter.delete("/:id", async (req, res, next) => {
  const contactId = req.params.id;

  Contact.findByIdAndRemove(contactId)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

module.exports = contactsRouter;
