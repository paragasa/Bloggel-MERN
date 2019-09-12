import React from 'react';
import Banner from './../../Banner';
import Article from './../../Article';

const Articles= ({articles, nextUrl, prevUrl, handlePagination}) =>{
    
    return (
        <div>
        <Banner 
            backgroundImage="url(https://source.unsplash.com/collection/388793/1100x900)"
            title="Bloggel"
            subTitle="Check out some of the latest blogs."
        >
        </Banner>
        <main className="main-content bg-gray">
        <div className="row ">
            <div className="articles-box col-12 ">
                {articles && articles.map(article => (
                    <div className="article-item col-8 col-lg-5  m-3" key={article._id}>
                    <Article article = {article} />
                    
                    </div>  
                ))}
                
                </div>
                <div className="mx-auto mt-15 mb-30">
                    <a onClick={()=>handlePagination(prevUrl)} className={`btn btn-white btn-page ${prevUrl?'': 'disabled'}`} >Newer
                        <i className="ti-arrow-left fs-9 mr-7" />
                    </a>
                    <a onClick={()=>handlePagination(nextUrl)} className={`btn btn-white btn-page ${nextUrl? '': 'disabled'}`} > 
                        <i className="ti-arrow-right fs-9 ml-7" />Older
                    </a>
                </div>
            </div>
            
        </main>
        
       
        </div>
    );
}
export default Articles;