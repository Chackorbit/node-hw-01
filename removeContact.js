const getAll = require("./getAll");
const fs = require("fs/promises");
const filePath = require("./filePath");

const removeContact = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  const remove = contacts.filter((item) => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(remove));
  return remove;
};

module.exports = removeContact;
