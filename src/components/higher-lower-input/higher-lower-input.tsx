"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./higher-lower-input.module.css";
import clsx from "clsx";

export const HigherLowerInput = ({ number: number }: { number: number }) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(99);
  const [higher, setHigher] = useState<string[]>(["100"]);
  const [lower, setLower] = useState<string[]>(["0"]);

  const mainInput = clsx(styles.base, styles.mainInput);
  const hlInput = clsx(styles.base, styles.h_l_input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      if (+inputValue > max) {
        setValue(max.toString());
      } else {
        setValue(inputValue);
      }   
    } else {
      console.error("Bitte gebe eine Zahl ein.");
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (+value < min) {
        console.error(`Die Zahl muss größer oder gleich ${min} sein.`);
      } else {
        if (+value > number) {
          setHigher([ value, ...higher]);
          setMax(+value - 1);
          setValue("");
        } else if (+value < number) {
          setLower([value, ...lower]);
          setMin(+value + 1);
          setValue("");
        } else {
          console.log('gewonnen')
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div style={{ position: "relative" }}>
      <AnimatePresence initial={false}>
        <motion.input
          className={mainInput}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyPress={(e) => onKeyPress(e)}
        />

        {higher.map((item, index) => {
          return (
            <motion.input
              value={item}
              disabled={true}
              key={`h-${item}`}
              className={hlInput}
              initial={{
                bottom: 0,
                left: 0,
              }}
              animate={{
                bottom: 50 * (index + 1) + 50,
                left: 0,
              }}
            />
          );
        })}
        
        {lower.map((item, index) => {
          return (
            <motion.input
              value={item}
              disabled={true}
              key={`l-${item}`}
              className={hlInput}
              initial={{
                top: 0,
                left: 0,
              }}
              animate={{
                top: 50 * (index + 1) + 50,
                left: 0,
              }}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
