import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import type { Food } from "../../types/food";
import FoodList from "../../components/food-list/FoodList";
import Button from "../../components/button";
import ErrorMessage from "../../components/error-message";
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

type FavoriteFoodsByUserQueryResponse = {
  allFavoriteFoodsByUser: Food[];
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

export const FAVORITE_FOODS_BY_USER_ID_QUERY = gql`
  query GetFavoriteFoodsByUser($userId: Int!) {
    allFavoriteFoodsByUser(userId: $userId) {
      code
      name
      calories
      portionAmount
      portionDisplayName
    }
  }
`;

const SEARCH_WILDCARD = "*";
const INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;
const STATIC_USER_ID = 1;

function Home() {
  const [searchableFoodName, setSearchableFoodName] = useState("");
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE);
  const [cachedFoodsResults, setCachedFoodsResults] = useState<Food[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();
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
  const { data: favoriteFoodsData } =
    useQuery<FavoriteFoodsByUserQueryResponse>(
      FAVORITE_FOODS_BY_USER_ID_QUERY,
      {
        variables: {
          userId: STATIC_USER_ID,
        },
      }
    );

  const hasTriggeredANewSearch = useRef(true);
  const hasTriggeredALoadMore = useRef(false);
  const mainRef = useRef<HTMLElement>(null);
  const previousMainYPosition = useRef<number>(0);

  useLayoutEffect(() => {
    if (
      hasTriggeredANewSearch.current &&
      typeof data?.foodsByName.foods !== "undefined"
    ) {
      const hasTriggeredALoadMoreScoped = hasTriggeredALoadMore.current;

      setCachedFoodsResults((previousCachedFoods) => [
        ...(hasTriggeredALoadMoreScoped ? previousCachedFoods : []),
        ...data.foodsByName.foods,
      ]);

      hasTriggeredANewSearch.current = false;
      hasTriggeredALoadMore.current = false;
    }
  }, [data]);

  useEffect(() => {
    mainRef.current?.scrollTo({
      top: previousMainYPosition.current,
    });
  }, [data]);

  const saveMainPosition = () => {
    previousMainYPosition.current = mainRef.current?.scrollTop ?? 0;
  };

  const resetMainPosition = () => {
    previousMainYPosition.current = 0;
  };

  const onSubmit = handleSubmit(({ foodName }: SearchForm) => {
    if (foodName === searchableFoodName) {
      return;
    }

    setPageNumber(INITIAL_PAGE);
    setSearchableFoodName(foodName !== SEARCH_WILDCARD ? foodName : "");
    resetMainPosition();

    hasTriggeredANewSearch.current = true;
  });

  const handleOnClickToPaginate = () => {
    setPageNumber(pageNumber + 1);
    saveMainPosition();

    hasTriggeredANewSearch.current = true;
    hasTriggeredALoadMore.current = true;
  };

  const shouldRenderLoadMoreButton =
    pageNumber < (data?.foodsByName.countPages ?? INITIAL_PAGE);
  const shouldRenderFoodList =
    !loading && !error && !!cachedFoodsResults.length;
  const shouldRenderEmptyMessage =
    !loading && !error && !errors.foodName && !cachedFoodsResults.length;

  return (
    <>
      <header className={styles.header}>
        <p className={styles.subtitle}>Diet and weight management</p>
        <h1 className={styles.title}>Calorie Counter</h1>
      </header>
      <main ref={mainRef} className={styles.content}>
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
        {errors.foodName && (
          <ErrorMessage
            className={styles.foodNameErrorMessage}
            message="You need to write some term to make the search more assertive :D"
          />
        )}
        {shouldRenderFoodList && (
          <>
            <FoodList
              foods={cachedFoodsResults}
              favoriteFoods={favoriteFoodsData?.allFavoriteFoodsByUser ?? []}
            />
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
        {shouldRenderEmptyMessage && (
          <ErrorMessage message="No results found, refine the term and try again :D" />
        )}
      </main>
    </>
  );
}

export default Home;
