const Contact = require("./contactsModel");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateContactFavorite = async (contactId, favorite) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return null;
  }
  contact.favorite = favorite;
  return await contact.save();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};

// const fs = require("fs/promises");
// const path = require("path");
// const { randomUUID } = require("crypto");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const filteredContacts = contacts.filter(
//     (contact) => contact.id !== contactId
//   );

//   if (contacts.length > filteredContacts.length) {
//     await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
//     return true;
//   }

//   return false;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = { id: randomUUID().slice(0, 21), ...body };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   const updatedContact = { ...contacts[index], ...body };
//   contacts[index] = updatedContact;
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
