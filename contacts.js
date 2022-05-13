// contacts.js

const fs = require("fs/promises");
const getAll = require("./getAll.js");
const getById = require("./getById.js");
const addContact = require("./addContact");
const removeContact = require("./removeContact");

const invokeAction = async ({ action, id, data }) => {
  switch (action) {
    case "getAll":
      const contacts = await getAll();
      console.log("contacts: ", contacts);
      break;
    case "getById":
      const contact = await getById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("contact: ", contact);
      break;
    case "addContact":
      const newContact = await addContact(data);
      console.log("newContact: ", newContact);
      break;
    case "removeContact":
      const remove = await removeContact(id);
      if (!remove) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("remove: ", remove);
      break;
    default:
      console.log("Unknown Action");
  }
};

// TODO: задокументировать каждую функцию
function listContacts() {
  return invokeAction({ action: "getAll" });
}
// Получить контакт
function getContactById(contactId) {
  return invokeAction({ action: "getById", id: contactId });
}

// Добавить контакт
function addNewContact(name, email, phone) {
  const newContact = {
    name: name,
    email: email,
    phone: phone,
  };

  invokeAction({ action: "addContact", data: newContact });
}

//  Удалить контакт
function deleteContact(contactId) {
  invokeAction({ action: "removeContact", id: contactId });
}

module.exports = {
  listContacts,
  getContactById,
  addNewContact,
  deleteContact,
};
