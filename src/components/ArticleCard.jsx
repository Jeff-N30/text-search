import React from 'react';
import { Highlight } from './Highlight';

export function ArticleCard({ article, query, index }) {
  return (
    <article className="article-card" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="article-title">
        <h2>
          <Highlight text={article.title} query={query} />
        </h2>
      </div>

      <div className="article-metadata">
        <span className="author">
          <Highlight text={article.author} query={query} />
        </span>
        <span className="separator">·</span>
        <span className="date">{article.date}</span>
        <span className="separator">·</span>
        <span className="category-badge">{article.category}</span>
        <span className="separator">·</span>
        <span className="read-time">{article.readTime}</span>
      </div>

      <p className="article-excerpt">
        <Highlight text={article.excerpt} query={query} />
      </p>

      <div className="article-tags">
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            <Highlight text={tag} query={query} />
          </span>
        ))}
      </div>
    </article>
  );
}
