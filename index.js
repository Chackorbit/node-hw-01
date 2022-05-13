// index.js
const getAll = require("./getAll");
const getById = require("./getById.js");
const addContact = require("./addContact");
const removeContact = require("./removeContact");

const argv = require("yargs").argv;
console.log("argv: ", argv);

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await getAll();
      console.log("contacts: ", contacts);
      break;

    case "get":
      const contact = await getById(`${id}`);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("contact: ", contact);
      break;

    case "add":
      const data = {
        name,
        email,
        phone,
      };
      const newContact = await addContact(data);
      console.log("newContact: ", newContact);
      break;

    case "remove":
      const remove = await removeContact(id);
      if (!remove) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("remove: ", remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
