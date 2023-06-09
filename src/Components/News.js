import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,    
    // pts+Enter
    pageSize:PropTypes.number,
  }
  capitalizeFirstLetter= (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    // console.log("Hi i am a constructor from news component");
    this.state={
      articles: [],
      loading : true,
      page:1,
      totalResults:0
    }
    document.title=`   ${   this.capitalizeFirstLetter(this.props.category)     }-NewsMonkey`;
  }
  async updateNews()
  {
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();
    this.props.setProgress(70);
    this.setState({
       articles:parsedData.articles,
       totalResults:parsedData.totalResults,
       loading:false,
      })
      this.props.setProgress(100);
  }
  async componentDidMount()  //this runs after render
  {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14e0d041cead42b9b0a1e965eeddd284&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // // The fetch() method starts the process of fetching a resource from a server.
    // // The fetch() method returns a Promise that resolves to a Response object.
    // let data= await fetch(url);
    
    // // "async and await make promises easier to write"
    // //  async makes a function return a Promise
    // //  await makes a function wait for a Promise
    // let parsedData= await data.json();
    
    // this.setState({
    //    articles:parsedData.articles,
    //    totalResults:parsedData.totalResults,
    //    loading:false,
    //   })
    
    this.updateNews();
  }

  handlePrevClick= async ()=>{
    // console.log("Pre Clicked");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14e0d041cead42b9b0a1e965eeddd284&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData= await data.json();
    
    // this.setState({
    //   loading:false,
    //   page:this.state.page-1,
    //   articles:parsedData.articles
    // })
    this.setState({page:this.state.page-1});
    this.updateNews();
  }

  handleNextClick=async ()=>{
    // if(  !(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))  )
    // {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14e0d041cead42b9b0a1e965eeddd284&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data= await fetch(url);
    //   let parsedData= await data.json();
      
    //   this.setState({
    //     loading:false,
    //     page:this.state.page+1,
    //     articles:parsedData.articles
    //   })
    // }
    this.setState({page:this.state.page+1});
    this.updateNews();
   
  }
   
  fetchMoreData = async () => {
    
    this.setState({page:this.state.page+1})
    
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({
       articles:this.state.articles.concat(parsedData.articles),
       totalResults:parsedData.totalResults,
      //  loading:false,
      })
  };


  render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'30px 0px'}}>News Monkey- Top Headlines on {   this.capitalizeFirstLetter(this.props.category)  } category</h1>
             {this.state.loading && <Spinner/>} 
             <InfiniteScroll
               dataLength={this.state.articles.length}
               next={this.fetchMoreData}
               hasMore={this.state.articles.length!==this.state.totalResults}
               loader={ <Spinner/>}
             >


             <div className='container'>
                
                 <div className='row'>
                   
                   { this.state.articles.map((element)=>{
                         return <div className="col-md-4" key={element.url}> 
                                    <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""}  imageUrl={element.urlToImage}  
                                     newsUrl={element.url} author={   element.author?element.author:"unknown"} date={    element.publishedAt      }  source={element.source.name}                 />
                                </div>
                    })}  
                 </div>
             </div>
        </InfiniteScroll>



        {/* <div className='container d-flex justify-content-between'>
             <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
             <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div> */}


      </>   
    )
  }
}


// key={element.url}