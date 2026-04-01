import React, { useEffect, useRef } from 'react';

export function SearchInput({ value, onChange, onClear }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="search-wrapper">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search articles by title, author, topic..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        aria-label="Search articles"
      />
      {value && (
        <button
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}
