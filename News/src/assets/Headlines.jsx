import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Headlines = () => {

  const [headlines,setHeadlines]=useState([]);
  useEffect(()=>{
    const fetchHeadlines =async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines',{
          params:{
            sources:'the-times-of-india',
            apiKey:'9ef7a8c41a84452a89d511a0c1fa60fa'
          },
        });
        setHeadlines(response.data.articles);
      } catch (error) {
        console.error("ERROR",error);
      }
    };
    fetchHeadlines();
  },[]);
  return (
    <div>
      <h1>Top Headlines</h1>
      <div className='headlines-cont'>
        {headlines.map((article,index)=>(
          <div key={index} className='headline-card'>
            <a href='{article.url} target="_blank rel ="noopener noreferrer' className='headline-title'>
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Headlines