import { useEffect, useState } from 'react';
import racket from './assets/racket-padel.png';
import './App.css';

function App() {
   const [articles, setArticles] = useState([]);
   console.log('articles:', articles);

   useEffect(() => {
      fetch('http://localhost:8080/news')
         .then((response) => response.json())
         .then((data) => {
            setArticles(data);
         })
         .catch((error) => {
            console.error('Ha ocurrido un error', error);
         });
   }, []);

   return (
      <>
         <div>
            <h1>Info Padel</h1>
            <img src={racket} className="logo" alt="Vite logo" />

            {articles.slice(0, 10).map((article, index) => (
               <div key={index} style={{ marginTop: '2rem' }}>
                  <h3>{article.title}</h3>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                     <img
                        src={article.photo}
                        alt={article.title}
                        style={{ marginTop: '0.5rem', maxWidth: '500px', maxHeight: '500px' }}
                     />
                  </a>
               </div>
            ))}
         </div>
      </>
   );
}

export default App;
