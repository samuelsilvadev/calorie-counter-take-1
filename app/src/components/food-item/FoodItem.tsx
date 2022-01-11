import { gql, useMutation } from "@apollo/client";
import type { Food } from "../../types/food";
import { FAVORITE_FOODS_BY_USER_ID_QUERY } from "../../views/home/Home";
import Button from "../button";
import FilledStar from "../icons/FilledStar";
import Star from "../icons/Star";
import styles from "./FoodItem.module.css";

type Props = {
  food: Food;
  isFavorite: boolean;
};

const MARK_AS_FAVORITE_MUTATION = gql`
  mutation MarkAsFavorite($code: Int!, $userId: Int!) {
    markFoodAsFavorite(code: $code, userId: $userId) {
      code
    }
  }
`;

const STATIC_USER_ID = 1;

function FoodItem({ food, isFavorite }: Props) {
  const [markFoodAsFavorite, { loading }] = useMutation(
    MARK_AS_FAVORITE_MUTATION,
    {
      refetchQueries: [
        {
          query: FAVORITE_FOODS_BY_USER_ID_QUERY,
          variables: { userId: STATIC_USER_ID },
        },
      ],
    }
  );

  const handleOnMarkAsFavorite = () => {
    markFoodAsFavorite({
      variables: {
        code: Number(food.code),
        userId: STATIC_USER_ID,
      },
    });
  };

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
        <Button
          onClick={handleOnMarkAsFavorite}
          className={styles.favoriteButton}
          aria-label={`Mark ${food.name} as favorite`}
          disabled={loading}
        >
          {isFavorite ? <FilledStar /> : <Star />}
        </Button>
      </article>
    </li>
  );
}

export default FoodItem;
