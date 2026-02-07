import { useRef, useEffect } from "react";
import LetterBox from "./LetterBox";

export default function PatternInput({ pattern, setPattern, includedRef, excludedRef, patternRef }) {
  const refs = useRef([]);
  
  useEffect(() => {
    if (pattern.every(ch => ch === "_")) {
      refs.current[0]?.focus();
    }
  }, [pattern]);

  useEffect(() => {
    if (patternRef) {
      patternRef.current = {
        focus: () => refs.current[0]?.focus()
      };
    }
  }, [patternRef]);
  
  const updateChar = (index, char) => {
    const next = [...pattern];
    next[index] = char || "_";
    setPattern(next);
    if (char && index < 4) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      includedRef?.current?.focus();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      excludedRef?.current?.focus();
      return;
    }
    if (e.key === "ArrowRight" && index < 4) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
      return;
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...pattern];
      if (pattern[index] !== "_") {
        next[index] = "_";
        setPattern(next);
      } else if (index > 0) {
        next[index - 1] = "_";
        setPattern(next);
        refs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key.length === 1 && !/[a-zA-Z ]/.test(e.key)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      {pattern.map((ch, i) => (
        <LetterBox
          key={i}
          value={ch === "_" ? "" : ch}
          inputRef={el => (refs.current[i] = el)}
          onChange={val => updateChar(i, val)}
          onKeyDown={e => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}