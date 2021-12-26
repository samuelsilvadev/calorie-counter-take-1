import type { Food } from "../../types/food";
import Button from "../button";
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
        <Button
          as="link"
          className={styles.button}
          aria-label={`Go to the calculator page of the ${food.name}`}
          to={`/calculator/${food.code}`}
        >
          Select
        </Button>
      </article>
    </li>
  );
}

export default FoodItem;
