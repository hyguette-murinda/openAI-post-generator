import React, { useState } from 'react';
import axios from 'axios';

const OPENAI_API_KEY = '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';
 export default function PostGenerator() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [generatedPost, setGeneratedPost] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Make a request to the OpenAI API to generate the post
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: 'image-alpha-001',
        prompt: `${title}\n${description}\nEmail: ${email}\nPhone: ${phone}`,
        n: 1,
        size: '256x256',
        response_format: 'url'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      })
  
      // Set the generated post and image in the state
      setGeneratedPost(response.data.data[0].text);
      setGeneratedImage(response.data.data[0].url);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="shadow border-[#FFE4E4] border-[2px] rounded w-[20%] h-[6vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="shadow border-[#FFE4E4] border-[2px] rounded w-[20%] h-[6vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="shadow border-[#FFE4E4] border-[2px] rounded w-[20%] h-[6vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="shadow border-[#FFE4E4] border-[2px] rounded w-[20%] h-[6vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        
        <br />
        <button type="submit" className="bg-[#EF5555] hover:bg-[#f6a1a1] text-white font-bold py-2 mt-5 px-4 w-[10%] rounded focus:outline-none focus:shadow-outline">Generate Post</button>
        </form>
    )
}