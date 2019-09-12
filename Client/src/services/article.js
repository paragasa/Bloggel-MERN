import Axios from 'axios';
import {validateAll} from 'indicative'
import config from './../config';

export default class ArticleServices {

    //Categories for Create Article
    // async getArticleCategories(){
    //     let categories = JSON.parse(localStorage.getItem('categories'));
        
    //     if(categories){
    //         return categories;
    //     }else{
    //         categories = await Axios.get(`${config.apiUrl}/categories`);
    //         localStorage.setItem('categories', JSON.stringify(categories.data.categories)); //store cats
    //     }

    //     return categories.data.categories;
    // }

    //value of this would be boud to this class, pass class if you want it to have access to same data
    createArticle = async(data, token) =>{
        if (!data.image) {
            return Promise.reject([{
              message: 'The image is required.',
            }]);
          }
       
        try {
            const rules ={
                title: 'required',
                content: 'required' ,
              
                // category: 'required',
            }
            const messages ={
                required: 'The {{field}} is required'
            }
            
            await validateAll(data, rules, messages)

        
            const image= await this.uploadToCloudinary(data.image);
            
           
            const response = await Axios.post(`${config.apiUrl}/articles`,{
            title: data.title,
            content: data.content,
            // category_id: data.category,
            imageUrl: image.secure_url,
             },{
            headers: {
                Authorization: token,
            }
            });
        
            return response.data;
        } catch (errors) {
            //errors from server
            if(errors.response){ 
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
  
    }
    updateArticle = async(data,article, token) =>{

        //upload and update image only if user places new one
        let image;
       

        try {
            if(data.image){
                image = await this.uploadToCloudinary(data.image);
            }
            const rules ={
                title: 'required',
                content: 'required' ,
                // category: 'required',
            }

            const messages ={
                required: 'The {{field}} is required'
            }       
            await validateAll(data, rules, messages);

            const response = await Axios.put(`${config.apiUrl}/articles/${article._id}`,{
            title: data.title,
            content: data.content,
    
            imageUrl: image? image.secure_url: article.imageUrl,
             },{
            headers: {
                Authorization: token,
            }
            });
        
            return response.data;
        } catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
       
        
    }
    async uploadToCloudinary(image){
       try{ const form = new FormData();

        form.append('file' , image);

        form.append('upload_preset', 'sf1li94r');

        const response = await Axios.post('https://api.cloudinary.com/v1_1/dazp4u2d6/image/upload', form)

        return response.data;}
        catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
    }

    getArticles = async(url=`${config.apiUrl}/articles`) => {
        try{const response = await Axios.get(url)
       
        return response.data;}
        catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
    }

    getArticle = async(slug)=>{
        try{
            const response = await Axios.get(`${config.apiUrl}/article/${slug}`);
      
            return response.data;
        }catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
    }

    getUserArticles = async(token, url=`${config.apiUrl}/articles/user`) => {
        try{
            const response = await Axios.get(url,{
            headers:{
                Authorization: token,
            }
        });
        return response.data;
        }catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
   
        
       
    }
    async deleteArticle(id,token){
        
        try {
            const response = await Axios.delete(`${config.apiUrl}/articles/${id}`
            ,{
                headers:{
                    Authorization: token,
                }
            });     
        } catch (errors) {
            //errors from server
            if(errors.response){ 
                
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
       
        
    }

}