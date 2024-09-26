import styles from "./page.module.css";
import { HigherLowerInput } from "@/components/higher-lower-input/higher-lower-input";

export default function Guesser() {

  const randomNumber = Math.floor(Math.random() * 98) + 1;
  console.log(randomNumber);
  
  return (
    <main className={styles.main}>
      <HigherLowerInput number={randomNumber} />
    </main>
  );
}
