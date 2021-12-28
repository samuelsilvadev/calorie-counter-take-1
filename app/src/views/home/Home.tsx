import { useEffect, useRef, useState } from "react";
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
const INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;

function Home() {
  const [searchableFoodName, setSearchableFoodName] = useState("");
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE);
  const [cachedFoodsResults, setCachedFoodsResults] = useState<Food[]>([]);

  const { register, handleSubmit } = useForm<SearchForm>();
  const { data, loading, error } = useQuery<PaginatedFoodByNameQueryResponse>(
    PAGINATED_FOOD_BY_NAME_QUERY,
    {
      variables: {
        name: searchableFoodName,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      },
    }
  );
  const wasLoading = useRef(loading);

  useEffect(() => {
    const hasRecentlyFetched = wasLoading.current && !loading;

    if (
      hasRecentlyFetched &&
      typeof data?.foodsByName.foods !== "undefined" &&
      data.foodsByName.foods.length > 0
    ) {
      setCachedFoodsResults((previousCachedFoods) => [
        ...previousCachedFoods,
        ...data.foodsByName.foods,
      ]);
    }
  }, [data, loading]);

  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);

  const onSubmit = handleSubmit(({ foodName }: SearchForm) => {
    setPageNumber(INITIAL_PAGE);
    setCachedFoodsResults([]);
    setSearchableFoodName(foodName === SEARCH_WILDCARD ? "" : foodName);
  });

  const handleOnClickToPaginate = () => {
    setPageNumber(pageNumber + 1);
  };

  const shouldRenderLoadMoreButton =
    pageNumber < (data?.foodsByName.countPages ?? INITIAL_PAGE);
  const shouldRenderFoodList =
    !loading && !error && !!cachedFoodsResults.length;

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
        {shouldRenderFoodList && (
          <>
            <FoodList foods={cachedFoodsResults} />
            {shouldRenderLoadMoreButton && (
              <Button
                className={styles.loadMoreButton}
                onClick={handleOnClickToPaginate}
              >
                Load more
              </Button>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Home;
