import React from 'react';

export function EmptyState({ query }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">✦</div>
      <h3>No articles found</h3>
      <p>
        We couldn't find any articles matching <span className="query">"{query}"</span>
      </p>
      <p className="hint">Try searching for topics like CSS, React, accessibility, or performance</p>
    </div>
  );
}
