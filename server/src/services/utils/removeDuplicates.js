function removeDuplicates(foods) {
  const foodsByCode = foods.reduce((foodsMap, food) => {
    foodsMap[food.code] = food;
    return foodsMap;
  }, {});

  return Object.values(foodsByCode);
}

module.exports = { removeDuplicates };
