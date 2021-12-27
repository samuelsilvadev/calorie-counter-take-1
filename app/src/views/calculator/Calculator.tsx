import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import styles from "./Calculator.module.css";

type CalculatorForm = {
  amount: number;
};

type UseParams = {
  foodId?: string;
};

type FoodByCodeQueryResponse = {
  foodByCode: {
    name: string;
    calories: number;
    portionAmount: number;
    portionDisplayName: string;
  };
};

const FOOD_BY_CODE_QUERY = gql`
  query GetFoodByCode($code: Int!) {
    foodByCode(code: $code) {
      name
      calories
      portionAmount
      portionDisplayName
    }
  }
`;

function Calculator() {
  const { foodId } = useParams<UseParams>();
  const { register, handleSubmit } = useForm<CalculatorForm>();
  const { data } = useQuery<FoodByCodeQueryResponse>(FOOD_BY_CODE_QUERY, {
    variables: {
      code: foodId ? parseInt(foodId, 10) : undefined,
    },
  });
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(
    null
  );

  const onSubmit = handleSubmit(({ amount }: CalculatorForm) => {
    if (data?.foodByCode.calories) {
      const totalCalories = data.foodByCode.calories * amount;

      setCalculatedCalories(totalCalories);
    }
  });

  if (!data?.foodByCode) {
    return <>Loading...</>;
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <header>
          <Button className={styles.back} as="link" to="/">
            Back
          </Button>
        </header>
        <div className={styles.foodDetails}>
          <h2>{data.foodByCode.name}</h2>
          <h3>
            {data.foodByCode.calories} calories | Serving size:
            {data.foodByCode.portionAmount} {data.foodByCode.portionDisplayName}
          </h3>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="amount">Amount</label>
          <input
            className={styles.input}
            id="amount"
            type="number"
            {...register("amount", { required: true })}
          />
          <Button>Calculate</Button>
        </form>
        {calculatedCalories && (
          <h4 className={styles.calculatedCalories}>
            You've consumed: {calculatedCalories} calories
          </h4>
        )}
      </section>
    </div>
  );
}

export default Calculator;
