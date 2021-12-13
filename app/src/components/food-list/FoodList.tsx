import type { Food } from "../../types/food";
import FoodItem from "../food-item/FoodItem";
import styles from "./FoodList.module.css";

type Props = {
  foods: Food[];
};

function FoodList({ foods }: Props) {
  return (
    <ul className={styles.wrapper}>
      {foods.map((food: Food) => (
        <FoodItem key={food.code} food={food} />
      ))}
    </ul>
  );
}

export default FoodList;
