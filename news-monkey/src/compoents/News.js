
import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)






  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4f1b170574a84de2a05df8f0422d7bcf&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    setLoading(true)
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }
  
  
  useEffect(() => {
    
    updateNews();
// eslint-disable-next-line react-hooks/exhaustive-deps
   }, []); 

  //  const  handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  //   }

  // const handleNextClick = async () => {
  //     setPage(page+1)
  //     updateNews();
  //   }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4f1b170574a84de2a05df8f0422d7bcf&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)

  };

  return (
    <>
      <h2 style={{margin: " 40px 0px", marginTop:"90px"}}>NewsMonkey - Top Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row '>

            {articles.map((element) => {
              return <div className='col-md-4 mx-8' key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 45) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>


            })}
          </div>
        </div>

      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous </button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

          </div> */}

    </>


  )
}


News.defaultProps = + {
  country: 'in',
  pageSize: 8,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News