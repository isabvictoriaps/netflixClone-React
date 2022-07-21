import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
     // pegando a lista total
     let list = await Tmdb.getHomeList();
     setMovieList(list);

    //  pegando o featured 

    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
    
    }

    loadAll();
  }, [])

  useEffect (()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&

      <FeaturedMovie item = {featuredData} />

      }
      
    <section className="lists">
      {movieList.map((item, key)=>(
        <MovieRow key={key} title={item.title} items={item.items} />
      ))}
      </section>

      <footer>

        Feito com <span role="img"  aria-label="coração">❤️‍🔥</span> por Giovanna Gomes, Isabelle Victoria e Max Henrique |

        Direitos de imagem para Netflix |

        Dados pegos do site Themoviedb.org

      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
        <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
      </div>
      }
    </div>
  );
}