import React, { useEffect, useRef } from 'react';

export function SearchInput({ value, onChange, onClear }) {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search articles"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        aria-label="Search articles"
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}