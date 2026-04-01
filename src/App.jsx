import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { articles } from './data/articles';
import { SearchInput } from './components/SearchInput';
import { ArticleCard } from './components/ArticleCard';
import { EmptyState } from './components/EmptyState';

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState(articles);

  // Match navigation state
  const [matchIndex, setMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const matchRefs = useRef([]);

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
    // reset nav on query change
    setMatchIndex(0);
    setTotalMatches(0);
    matchRefs.current = [];
  }, [debouncedQuery]);

  // After render, collect all mark elements and count them
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setTotalMatches(0);
      matchRefs.current = [];
      return;
    }
    // small delay so DOM is painted
    const id = setTimeout(() => {
      const marks = Array.from(document.querySelectorAll('mark'));
      matchRefs.current = marks;
      setTotalMatches(marks.length);
      setMatchIndex(0);
    }, 80);
    return () => clearTimeout(id);
  }, [results, debouncedQuery]);

  // Highlight active mark and scroll to it
  useEffect(() => {
    const marks = matchRefs.current;
    if (!marks.length) return;
    marks.forEach((m, i) => {
      m.classList.toggle('active-match', i === matchIndex);
    });
    const active = marks[matchIndex];
    if (active) {
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 160;
      const top =
        active.getBoundingClientRect().top + window.scrollY - headerHeight - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [matchIndex, totalMatches]);

  const goNext = useCallback(() => {
    setMatchIndex((i) => (i + 1) % totalMatches);
  }, [totalMatches]);

  const goPrev = useCallback(() => {
    setMatchIndex((i) => (i - 1 + totalMatches) % totalMatches);
  }, [totalMatches]);

  // Keyboard shortcut: Enter = next, Shift+Enter = prev
  useEffect(() => {
    const handler = (e) => {
      if (!totalMatches) return;
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, totalMatches]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="app">
      <header className="header">
        {/* Ghost title — above search bar, bottom edge dissolves into it */}
        <h1 className="main-title">Text Search</h1>

        {/* Search bar — positioned above title's fade zone */}
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={handleClear}
        />
      </header>

      {/* Gradient fade so scrolling content dissolves under the header */}
      <div className="header-fade" />

      {/* Match navigator — appears only when there are matches */}
      {totalMatches > 1 && (
        <nav className="match-nav" aria-label="Match navigation">
          <button
            className="match-nav-btn"
            onClick={goPrev}
            title="Previous match (Shift+Enter)"
            aria-label="Previous match"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,8 6,4 10,8" />
            </svg>
          </button>

          <span className="match-nav-count">
            {matchIndex + 1}/{totalMatches}
          </span>

          <button
            className="match-nav-btn"
            onClick={goNext}
            title="Next match (Enter)"
            aria-label="Next match"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,4 6,8 10,4" />
            </svg>
          </button>
        </nav>
      )}

      {/* Result count below the grid line */}
      {query && (
        <div className="result-count">
          {results.length > 0 ? (
            <>
              <span className="count">{results.length}</span>
              <span>{results.length === 1 ? 'article' : 'articles'} found</span>
              {totalMatches > 0 && (
                <span style={{ marginLeft: 12, opacity: 0.65 }}>
                  · {totalMatches} {totalMatches === 1 ? 'match' : 'matches'}
                </span>
              )}
            </>
          ) : (
            <span>No articles found</span>
          )}
        </div>
      )}

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