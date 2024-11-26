import React, {useEffect, useState} from 'react'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css'; 


// displays all the posts
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get("http://localhost:3000/posts/get_all_posts/",
          {
            withCredentials: true
          }
        );
        setPosts(response.data);
        console.log(response.data);
      }catch(err){
        console.log(err, "I am getting an error")
      }
    }
    fetchData();
  },[]);
  return (
    <div>
      {
        posts.map((e)=>{
          return <div key={e._id}>
          <h1>{e.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: e.content }}/>
          </div>
        })
      }
    </div>
  )
}

export default Home

