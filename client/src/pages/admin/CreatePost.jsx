import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const CreatePost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  // rich text editor - react quill
  const [content, setContent] = useState("");

  const quillRef = useRef();
  const imageHandler = ()=>{
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async ()=>{
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try{
        const response = await axios.post("http://localhost:3000/api/upload", 
          formData,
          {
            headers: {"Content-Type": "multipart/form-data"}
          }
        );
        const imageUrl = response.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        quill.insertEmbed(range.index, "image", imageUrl);
      }
      catch(err){
        console.error("Image upload failded: ", err);
      }


    }



  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        [{ align: [] }],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);
  

  const handleSubmit = async () => {
    console.log('Editor Content:', content); // Save or process the editor content

    try{
      const response = await axios.post("http://localhost:3000/posts/create_post",
        {
          title, 
          content,
          author, 
          tags,
          category
        }
      );
      if(response.status !== 201){
        console.log("error in posting a post");
      }
      else{
        console.log(response.data);
      }
    }
    catch(err){
      console.log("can not insert data");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/create_post",
          {
            withCredentials: true
          }
        );
        console.log(response.data);
        
        if (response.status !== 200) {
          setError('Error fetching data of create post');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <label htmlFor='title'>Title:</label>
      <input type="text" onChange={((e)=>{
        setTitle(e.target.value);
      })}/>
          <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write something amazing..."
      />

      {/* // selection will come in author and category section */}
      <label htmlFor='author'>Author Id:</label>
      <input type="text" onChange={((e)=>{
        setAuthor(e.target.value);
      })}/>
      <label htmlFor='tags'>tags:</label>
      <input type="text" onChange={((e)=>{
        setTags(e.target.value);
      })}/>
      <label htmlFor='author'>Category Id:</label>
      <input type="text" onChange={((e)=>{
        setCategory(e.target.value);
      })}/>
      <button onClick={handleSubmit}>POST</button>
    </div>
  );
};

export default CreatePost;
