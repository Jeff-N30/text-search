import React from 'react';

export function Highlight({ text, query }) {
  if (!query.trim()) {
    return text;
  }

  // Escape regex special characters and create case-insensitive regex
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          return (
            <mark key={index} className="highlight">
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
