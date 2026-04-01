import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { articles } from './data/articles';
import { SearchInput } from './components/SearchInput';
import { ArticleCard } from './components/ArticleCard';
import { EmptyState } from './components/EmptyState';

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState(articles);

  // Debounce search input with 150ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter articles when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(articles);
    } else {
      const lowerQuery = debouncedQuery.toLowerCase();
      const filtered = articles.filter((article) => {
        const searchableText = `
          ${article.title}
          ${article.excerpt}
          ${article.author}
          ${article.category}
          ${article.tags.join(' ')}
        `.toLowerCase();

        return searchableText.includes(lowerQuery);
      });
      setResults(filtered);
    }
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="decorative-symbol">✦</div>
          <h1 className="main-title">Text Search</h1>
          <p className="subtitle">A curated library of frontend knowledge</p>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={handleClear}
        />

        {query && (
          <div className="result-count">
            {results.length > 0 ? (
              <>
                <span className="count">{results.length}</span>
                <span>{results.length === 1 ? 'article' : 'articles'} found</span>
              </>
            ) : (
              <>
                <span>No articles found</span>
              </>
            )}
          </div>
        )}
      </header>

      <main className="content">
        {results.length > 0 ? (
          <div className="articles-list">
            {results.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                query={debouncedQuery}
                index={index}
              />
            ))}
          </div>
        ) : query ? (
          <EmptyState query={query} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
