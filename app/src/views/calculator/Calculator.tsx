import Button from "../../components/button";
import styles from "./Calculator.module.css";

function Calculator() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <header>
          <Button className={styles.back} as="link" to="/">
            Back
          </Button>
        </header>
        <form className={styles.form}>
          <label htmlFor="amount">Amount</label>
          <input
            className={styles.input}
            id="amount"
            type="text"
            name="amount"
          />
          <Button>Calculate</Button>
        </form>
      </section>
    </div>
  );
}

export default Calculator;
