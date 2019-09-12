import React from 'react'
import {Link} from 'react-router-dom'

const Article = ({article}) => {


    return (

        <article className="my-50">
          <header className="text-center mb-20">
            <h3>
              <Link to={`/article/${article.slug}`}>{article.title}</Link>
            </h3>
            <div className="link-color-default fs-12">
              <Link to={`/article/${article.slug}`} >by {article.author.name}</Link>,
              <time>{(new Date(article.createdAt)).toDateString()}</time>
            </div>
          </header>
          <Link to={`/article/${article.slug}`}>
            <img className="rounded" src={article.imageUrl} alt="..." />
          </Link>
          <div className="card-block">
            <p className="text-justify">{article.content.replace(/(<([^>]+)>)/g, "").substring(0,90)}</p>
            <p className="text-center mt-40">
              <Link className="btn btn-primary btn-round" to={`/article/${article.slug}`}>Read more</Link>
            </p>
          </div>
        </article>
      );
}
export default Article;