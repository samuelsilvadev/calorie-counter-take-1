import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import type { Food } from "../../types/food";
import FoodList from "../../components/food-list/FoodList";
import styles from "./Home.module.css";

type SearchForm = {
  foodName: string;
};

type FoodByNameQueryResponse = {
  foodsByName: Food[];
};

const FOOD_BY_NAME_QUERY = gql`
  query GetFoodsByName($name: String!) {
    foodsByName(name: $name) {
      code
      name
    }
  }
`;

const SEARCH_WILDCARD = "*";

function Home() {
  const [searchableFoodName, setSearchableFoodName] = useState("");

  const { register, handleSubmit } = useForm<SearchForm>();

  const { data, loading, error } = useQuery<FoodByNameQueryResponse>(
    FOOD_BY_NAME_QUERY,
    {
      variables: {
        name: searchableFoodName,
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
          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading || !!error}
          >
            Search
          </button>
        </form>
        {!loading && !error && !!data?.foodsByName?.length && (
          <FoodList foods={data.foodsByName} />
        )}
      </main>
    </>
  );
}

export default Home;
