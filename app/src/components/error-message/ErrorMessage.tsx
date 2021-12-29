import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
  className?: string;
}

function ErrorMessage({ message, className = "" }: Props) {
  const combinedClassName = `${styles.wrapper} ${className}`;

  return (
    <div role="alert" className={combinedClassName}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
