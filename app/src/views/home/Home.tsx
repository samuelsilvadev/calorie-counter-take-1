import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import type { Food } from "../../types/food";
import FoodList from "../../components/food-list/FoodList";
import Button from "../../components/button";
import styles from "./Home.module.css";

type SearchForm = {
  foodName: string;
};

type PaginatedFoodByNameQueryResponse = {
  foodsByName: {
    countPages: number;
    foods: Food[];
  };
};

const PAGINATED_FOOD_BY_NAME_QUERY = gql`
  query GetPaginatedFoodsByName(
    $name: String!
    $pageSize: Int!
    $pageNumber: Int!
  ) {
    foodsByName: paginatedFoodsByName(
      name: $name
      pageSize: $pageSize
      pageNumber: $pageNumber
    ) {
      countPages
      foods {
        code
        name
        calories
        portionAmount
        portionDisplayName
      }
    }
  }
`;

const SEARCH_WILDCARD = "*";

function Home() {
  const [searchableFoodName, setSearchableFoodName] = useState("");

  const { register, handleSubmit } = useForm<SearchForm>();

  const { data, loading, error } = useQuery<PaginatedFoodByNameQueryResponse>(
    PAGINATED_FOOD_BY_NAME_QUERY,
    {
      variables: {
        name: searchableFoodName,
        pageSize: 25,
        pageNumber: 1,
      },
    }
  );

  const onSubmit = handleSubmit(({ foodName }: SearchForm) => {
    setSearchableFoodName(foodName === SEARCH_WILDCARD ? "" : foodName);
  });

  return (
    <>
      <header className={styles.header}>
        <p className={styles.subtitle}>Diet and weight management</p>
        <h1 className={styles.title}>Calorie Counter</h1>
      </header>
      <main className={styles.content}>
        <form className={styles.searchForm} onSubmit={onSubmit}>
          <label htmlFor="search-food">Food Name</label>
          <input
            className={styles.input}
            type="search"
            id="search-food"
            placeholder="Use * to search all foods"
            {...register("foodName", { required: true })}
          />
          <Button
            className={styles.submitButton}
            type="submit"
            disabled={loading || !!error}
          >
            Search
          </Button>
        </form>
        {!loading && !error && !!data?.foodsByName?.foods?.length && (
          <FoodList foods={data.foodsByName.foods} />
        )}
      </main>
    </>
  );
}

export default Home;
