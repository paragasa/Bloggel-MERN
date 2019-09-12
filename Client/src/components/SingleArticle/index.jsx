
import React, { Component } from 'react'
import Article from './Article';


class SingleArticle extends Component {
  constructor() {
    super();
    this.state={
      article:null,
      loading:true,
    }
  }
  async componentWillMount(){
    //check article first before setting another get post,
    //only send get req if article not in preload articles
    let article = this.props.articles.find(article => article.slug === this.props.match.params.slug );
    if(article){
      this.setState({
          article: article,
          loading:false,
        })
    }else{
      article = await this.props.getArticle(this.props.match.params.slug)
    } 

    this.setState({
      article: article,
      loading:false,
    });
  }
  render() {
    return (
      <div>
          {
          !this.state.loading &&
          <Article
          article={this.state.article}
          />
        }
      </div>
      
      
    )
  }
}

export default SingleArticle;