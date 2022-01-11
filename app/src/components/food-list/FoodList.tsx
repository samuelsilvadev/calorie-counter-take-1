import type { Food } from "../../types/food";
import FoodItem from "../food-item/FoodItem";
import styles from "./FoodList.module.css";

type Props = {
  foods: Food[];
  favoriteFoods: Food[];
};

function groupFoodById(foods: Food[]) {
  return foods.reduce<Record<string, Food>>((groupedFoods, food) => {
    groupedFoods[food.code] = food;

    return groupedFoods;
  }, {});
}

function FoodList({ foods, favoriteFoods }: Props) {
  const groupedFavoriteFoods = groupFoodById(favoriteFoods);

  return (
    <ul className={styles.wrapper}>
      {foods.map((food: Food) => (
        <FoodItem
          key={food.code}
          food={food}
          isFavorite={!!groupedFavoriteFoods[food.code]}
        />
      ))}
    </ul>
  );
}

export default FoodList;
