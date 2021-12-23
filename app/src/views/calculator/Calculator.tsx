import { Link } from "react-router-dom";
import styles from "./Calculator.module.css";

function Calculator() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <Link className={styles.button} to="/">
          Back
        </Link>
      </section>
    </div>
  );
}

export default Calculator;
