import { Link } from "react-router-dom";
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
        <Link
          className={styles.button}
          to={`/calculator/${food.code}`}
          aria-label={`Go to the calculator page of the ${food.name}`}
        >
          Select
        </Link>
      </article>
    </li>
  );
}

export default FoodItem;
