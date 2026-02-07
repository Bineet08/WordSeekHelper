export default function LetterBox({
  value,
  onChange,
  onKeyDown,
  inputRef
}) {
  const handleChange = (e) => {
    const val = e.target.value;

    if (/^[a-zA-Z]?$/.test(val)) {
      onChange(val.toLowerCase());
    }
  };

  return (
    <input
      ref={inputRef}
      value={value}
      maxLength={1}
      inputMode="text"
      autoComplete="off"
      onChange={handleChange}
      onKeyDown={onKeyDown}
      onFocus={e => e.target.select()}
      className="w-16 h-16 text-center text-2xl font-bold uppercase bg-zinc-900 text-gray-100 border-2 border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
    />
  );
}