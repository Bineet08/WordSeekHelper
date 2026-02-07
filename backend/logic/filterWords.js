export function filterWords(words, pattern, included, excluded) {
  const regex = new RegExp(
    "^" + pattern.replace(/_/g, "[a-z]") + "$"
  );

  return words.filter(word => {
    // Pattern match
    if (!regex.test(word)) return false;

    // Excluded letters
    for (const ch of excluded) {
      if (word.includes(ch)) return false;
    }

    // Included letters (at least once)
    for (const ch of included) {
      if (!word.includes(ch)) return false;
    }

    return true;
  });
}
