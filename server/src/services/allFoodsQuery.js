const path = require("path");
const convertExcelToJson = require("convert-excel-to-json");

const foodDisplayTableNamesExcelToJsonMapper = new Map([
  ["Food_Code", "code"],
  ["Display_Name", "name"],
  ["Portion_Default", "portion"],
  ["Portion_Amount", "portionAmount"],
  ["Portion_Display_Name", "portionDisplayName"],
  ["Factor", "factor"],
  ["Increment", "increment"],
  ["Multiplier", "multiplier"],
  ["Grains", "grains"],
  ["Whole_Grains", "wholeGrains"],
  ["Vegetables", "vegetables"],
  ["Orange_Vegetables", "orangeVegetables"],
  ["Drkgreen_Vegetables", "darkGreenVegetables"],
  ["Starchy_vegetables", "starchyVegetables"],
  ["Other_Vegetables", "otherVegetables"],
  ["Fruits", "fruits"],
  ["Milk", "milk"],
  ["Meats", "meats"],
  ["Soy", "soy"],
  ["Drybeans_Peas", "dryBeansPeas"],
  ["Oils", "oils"],
  ["Solid_Fats", "solidFats"],
  ["Added_Sugars", "addedSugars"],
  ["Alcohol", "alcohol"],
  ["Calories", "calories"],
  ["Saturated_Fats", "saturatedFats"],
]);

function getFoodDisplayTableInJSON() {
  const foodDisplayTablePath = path.resolve(
    __dirname,
    "../../data/foodDisplayTable.xlsx"
  );
  const parsedFoodDisplayTable = convertExcelToJson({
    sourceFile: foodDisplayTablePath,
  });

  return parsedFoodDisplayTable;
}

function buildFood(tableHeader) {
  return {
    build(currentRow) {
      const food = {};

      Object.entries(tableHeader).forEach(([key, value]) => {
        const jsonKeyName = foodDisplayTableNamesExcelToJsonMapper.get(value);

        food[jsonKeyName] = currentRow[key];
      });

      return food;
    },
  };
}

function getAllFoodsQuery() {
  const foodDisplayTable = getFoodDisplayTableInJSON();

  if (!("Sheet1" in foodDisplayTable)) {
    return [];
  }

  const [tableHeader, ...tableRows] = foodDisplayTable.Sheet1;
  const foodBuilder = buildFood(tableHeader);

  const normalizedFoods = tableRows.reduce((foods, currentRow) => {
    const food = foodBuilder.build(currentRow);

    foods.push(food);

    return foods;
  }, []);

  return normalizedFoods;
}

module.exports = { getAllFoodsQuery };
