"use client"
import WelcomeButton from "@/components/welcome_button/welcome_button";
import styles from "./page.module.css";
import { HigherLowerInput } from "@/components/higher-lower-input/higher-lower-input";
import ThreejsCube from "@/components/threejs-cube/threejs-cube";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="flex flex-col items-center justify-center p-40 bg-white rounded-2xl">
        <h1 className="text-2xl font-bold mb-4 text-black">Willkommen!</h1>
        <WelcomeButton />
        <ThreejsCube />
      </div>
    </main>
  );
}