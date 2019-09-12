
import React from 'react';
import PropTypes from 'prop-types';
import Articles from './Articles';



class Welcome extends React.Component{
    constructor(){
        super();
        this.state={
            articles: [],
        }
    }

    async componentWillMount(){
     //send a get to articles
        const articles = await this.props.getArticles();
        // console.log(articles)

        this.setState({
            articles: articles,
        });
        
        //update app's article state
        this.props.setArticles(articles.data);
   
    }
    handlePagination= async(url)=>{
        //send a get to articles, next urls
        const articles= await this.props.getArticles(url);

        this.setState({
            articles:articles,
        });
        //update app's article state
        this.props.setArticles(articles);
    }
    render(){
        return(
            <Articles
                articles ={this.state.articles.data}
                nextUrl={this.state.articles.next_page_url}
                prevUrl ={this.state.articles.prev_page_url}
                handlePagination={this.handlePagination}
            />

        );
    }
}
Welcome.protoTypes={
    getArticles: PropTypes.func.isRequired,
}
export default Welcome;