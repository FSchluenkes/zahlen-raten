"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./higher-lower-input.module.css";
import clsx from "clsx";

export const HigherLowerInput = ({ number }: { number: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(99);
  const [higher, setHigher] = useState<string[]>(["100"]);
  const [lower, setLower] = useState<string[]>(["0"]);
  const [message, setMessage] = useState<string>("");

  const mainInput = clsx(styles.base, styles.main_input);
  const hlInput = clsx(styles.base, styles.h_l_input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      if (+inputValue > max) {
        setValue(max.toString());
        setMessage(`Die maximale Zahl ist ${max}.`);
      } else {
        setValue(inputValue);
        setMessage("");
      }   
    } else {
      setMessage("Bitte gebe eine Zahl ein.");
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (+value < min) {
        setMessage(`Die Zahl muss größer oder gleich ${min} sein.`);
      } else {
        if (+value > number) {
          setHigher([ value, ...higher]);
          setMax(+value - 1);
          setValue("");
          setMessage(`${value} ist zu hoch. Versuche eine kleinere Zahl.`);
        } else if (+value < number) {
          setLower([value, ...lower]);
          setMin(+value + 1);
          setValue("");
          setMessage(`${value} ist zu niedrig. Versuche eine größere Zahl.`);
        } else {
          setMessage("Glückwunsch! Du hast die richtige Zahl erraten!");
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <motion.div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence initial={false}>
          <motion.input
            className={mainInput}
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyPress={onKeyPress}
            aria-label="Gib deine Vermutung ein"
            aria-describedby="guess-description"
            type="number"
            min={min}
            max={max}
          />

          {higher.map((item, index) => (
            <motion.input
              value={item}
              disabled={true}
              key={`h-${item}`}
              className={hlInput}
              animate={{
                bottom: 50 * (index + 1) + 50,
              }}
              aria-label={`Zu hohe Vermutung: ${item}`}
            />
          ))}
          
          {lower.map((item, index) => (
            <motion.input
              value={item}
              disabled={true}
              key={`l-${item}`}
              className={hlInput}
              animate={{
                top: 50 * (index + 1) + 50,
              }}
              aria-label={`Zu niedrige Vermutung: ${item}`}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      <div id="guess-description" className="sr-only">
        Gib eine Zahl zwischen {min} und {max} ein und drücke Enter, um zu raten.
      </div>
      <div aria-live="polite" className="sr-only">
        {message}
      </div>
    </div>
  );
};