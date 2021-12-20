import type { Food } from "../../types/food";
import styles from "./FoodItem.module.css";

type Props = {
  food: Food;
};

function FoodItem({ food }: Props) {
  return (
    <li className={styles.wrapper}>
      <article className={styles.article}>
        <h2>{food.name}</h2>
        <h3>
          {food.calories} calories | Serving size: {food.portionAmount}{" "}
          {food.portionDisplayName}
        </h3>
        <button className={styles.button}>Select</button>
      </article>
    </li>
  );
}

export default FoodItem;