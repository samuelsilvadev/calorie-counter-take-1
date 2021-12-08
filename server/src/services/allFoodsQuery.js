const { deserializeFoodCsv } = require("./utils/deserializeFoodCsv");

function getAllFoodsQuery() {
  return deserializeFoodCsv();
}

module.exports = { getAllFoodsQuery };
