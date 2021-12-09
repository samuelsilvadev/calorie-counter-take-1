import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <header className={styles.header}>
        <p className={styles.subtitle}>Diet and weight management</p>
        <h1 className={styles.title}>Calorie Counter</h1>
      </header>
      <main className={styles.content}>
        <form className={styles.searchForm}>
          <label htmlFor="search-food">Food Name</label>
          <input className={styles.input} type="search" id="search-food" />

          <button className={styles.submitButton} type="submit">
            Search
          </button>
        </form>
      </main>
    </>
  );
}

export default Home;
