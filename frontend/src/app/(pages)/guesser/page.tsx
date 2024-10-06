"use client";
import { startGame } from "@/actions/flaskapi";
import styles from "./page.module.css";
import { HigherLowerInput } from "@/components/higher-lower-input/higher-lower-input";
import { useEffect, useState } from 'react';



export default function Guesser() {

  const hanleLoad = async() => {
    const gameId = localStorage.getItem('game_id');
    const acceessToken = localStorage.getItem('accessToken') || undefined;
  
    if (!gameId) {
         
      const response = await startGame(acceessToken);
      
      
      const gameId = response.game_id;
  
      if (gameId) {
        localStorage.setItem('game_id', gameId);
      } else {
        console.error(response.error);
      }
        
      }; 
  };  

  useEffect(() => {
    hanleLoad();
  }, []);
  
  return (
    <main className={styles.main}>
      <HigherLowerInput />
    </main>
  );
}
