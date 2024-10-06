import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Headlines() {
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            sources: 'the-times-of-india',
            apiKey: '9ef7a8c41a84452a89d511a0c1fa60fa',
            pageSize: 100, 
          },
        })
        setHeadlines(response.data.articles)
      } catch (error) {
        console.error("ERROR", error)
      }
    }
    fetchHeadlines()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Top Headlines</h1>
      <div style={styles.headlinesContainer}>
        {headlines.map((article, index) => (
          <div key={index} style={styles.headlineCard}>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.headlineTitle}
            >
              {article.title}
            </a>
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                style={styles.headlineImage} 
              />
            )}
            <p style={styles.headlineDescription}>{article.description}</p>
            <p style={styles.headlineSource}>Source: {article.source.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  headlinesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  headlineCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  headlineTitle: {
    fontSize: '1.2rem',
    color: '#1a1a1a',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  },
  headlineImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  headlineDescription: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '10px',
  },
  headlineSource: {
    fontSize: '0.8rem',
    color: '#999',
    fontStyle: 'italic',
  },
}