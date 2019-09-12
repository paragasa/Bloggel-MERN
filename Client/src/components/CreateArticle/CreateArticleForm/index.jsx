import React from 'react'
import Banner from './../../Banner';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const CreateArticleForm = ({
  handleInput,editing,updateArticle, article, 
  title,  content,onEditorStateChange, handleSubmit,  errors}) => {
    return (
        <div>
          {/* END Header */}
          <Banner
              backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`} 
             
              title= {editing?`Editing Article ${title}`: 'Write an article'}
          ></Banner>
          {/* Main container */}
          <main className="main-content">
            <section className="section">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-12">
                  <ul className="list-group">
                    {
                        errors && errors.map(error => <li key={error.message} className="list-group-item text-danger">{error.message}</li>)
                    }
                  </ul>
                    <form onSubmit={editing?updateArticle:handleSubmit} className="p-30 bg-gray rounded" >
                      <div className="row">
                        <div className="form-group col-md-12 my-5">
                          <h4>Upload your image</h4>
                          <input 
                          name="image" 
                          onChange={handleInput}
                           type="file" 
                           className="form-control" />
                        </div>
                        
                        <div className="form-group col-12 col-md-6">
                          <input 
                          onChange={handleInput} 
                          className="form-control form-control-lg" 
                          type="text" name="title" 
                          value={title}
                          placeholder="Title" />
                        </div>
                        {/* <div className="form-group col-12 col-md-6">
                          <select 
                          name="category" 
                          value={category|| ''}
                          onChange={handleInput} 
                          className="form-control form-control-lg">

                            <option value>Select category</option>

                            {categories.map(categoryOfArray =>(
                              <option
                               key={categoryOfArray.id} 
                               value={categoryOfArray.id}>
                              {categoryOfArray.name}
                             </option>))}

                          </select>
                        </div> */}
                      </div>
                      <div className="form-group">
                          <Editor
                            editorState={content}
                            onEditorStateChange={onEditorStateChange}
                          />
                      </div>
                      <div className="text-center">
                        <button className="btn btn-lg btn-primary" type="submit">{editing? 'Update Article': 'Create Article'}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      );
}
CreateArticleForm.propTypes = {
  handleInput: PropTypes.func.isRequired,
  // categories: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
  })).isRequired,
  editing: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  // category: PropTypes.string,
  updateArticle: PropTypes.func.isRequired,
};

CreateArticleForm.defaultProps = {
  article: null,
  // category: null,
};

export default CreateArticleForm;
