import React, {useReducer} from "react";
import { call } from "react-native-reanimated";
import createDataContext from "./createDataContext";
import jsonServer from "../api/json-server";


const blogReducer = (state, action) => {
    switch(action.type) {
        case 'get_blogposts': 
        return action.payload;
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [...state ,
            { 
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }
        ];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        default:
        return state;
    }

};


const getBlogPost = dispatch => {
    return async () => {
    const response = await jsonServer.get('/blogposts');
    
    dispatch ({type: 'get_blogposts', payload: response.data });
    };
};



const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', {title, content});
        // dispatch({ 
        //     type: 'add_blogpost', payload: {title, content} });
            if (callback) {
                callback();
            }
    };
};

const deleteBlogPost = dispatch => {
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch ({ type: 'delete_blogpost', payload: id})
};
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content });
        
        dispatch({
            type: 'edit_blogpost', 
            payload: {id, title, content}
    });
    if (callback) {
        callback();
    }
    };
};
    

export const {Context, Provider} = createDataContext( blogReducer, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPost} ,
[]
);

