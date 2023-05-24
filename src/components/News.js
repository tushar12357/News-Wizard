import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
// import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country:'in',
    category:'general',
    pageSize:9
  }
  static propTypes = {
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number
  }
    constructor(){
        super();
        // console.log("Construct")
        this.state = {
            articles: [],
            // loading: false,
            page: 1,
            totalResults:0
        }
    }
    async componentDidMount(){
        // console.log("cdm")
        this.props.setProgress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=813e47dc1ce041db8ebcb220ec6fb469&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data=await fetch(url)
        let parsedData=await data.json()
        // console.log(parsedData)
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
        this.props.setProgress(100)
    }
    //  handleNext=async()=>{
    //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=813e47dc1ce041db8ebcb220ec6fb469&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //     // this.setState({loading:true})
    //     let data=await fetch(url)
    //     let parsedData=await data.json()
    //   this.setState({
    //     page:this.state.page+1,
    //     articles:parsedData.articles,
    //     // loading:false
    //     totalResults:parsedData.totalResults
    //   }) 
    //   } 
    //   // else{
    //   // } 
    // }
    // handlePrevious=async()=>{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=813e47dc1ce041db8ebcb220ec6fb469&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    //   // this.setState({loading:true})
    //     let data=await fetch(url)
    //     let parsedData=await data.json()
    //   this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     // loading:false
    //     totalResults:parsedData.totalResults
    //   }) 
    // }
    fetchMoreData = async() => {
      this.setState({page:this.state.page+1})
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=813e47dc1ce041db8ebcb220ec6fb469&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data=await fetch(url)
        let parsedData=await data.json()
        // console.log(parsedData)
        this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults})
    };
  render() {
    // console.log("render")
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'75px'}}>News Wizard - Top Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
          >
            <div className="container">
        <div className="row my-3" >
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItems  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
      
    )
  }
}

export default News
