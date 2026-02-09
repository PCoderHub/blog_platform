import React, { useEffect, useRef, useState } from "react";
import Editor from "./RichTextEditor/Editor";
import { createPost, getMyPosts } from "../api/services/postServices";
import Quill from "quill";
import "./Editor.css";

function AuthorHome() {
  const [posts, setPosts] = useState([]);
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();

  const quillRef = useRef();

  const Delta = Quill.import("delta");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await getMyPosts();
        console.log(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchMyPosts();
  }, []);

  const createNewPost = async () => {
    try {
      const response = await createPost({
        description: JSON.stringify(quillRef.current.getContents().ops),
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deltaToHTML = (delta) => {
    const quill = new Quill(document.createElement("div"), { readOnly: true });
    quill.setContents(delta);
    return quill.root.innerHTML;
  };

  return (
    <div className="m-2">
      <div className="w-full md:w-2/3 mx-auto editorbox">
        <Editor
          ref={quillRef}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <div class="controls">
          <button
            className="controls-right bg-blue-800 py-2 px-4 text-white rounded-lg"
            type="button"
            onClick={createNewPost}
          >
            Post
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center my-10 font-bold text-xl text-red-800">
          My Posts
        </h2>
        {posts.map((post) => {
          let ops = JSON.parse(post.description);
          const html = deltaToHTML(new Delta(ops));
          return (
            <div
              key={post._id}
              className="prose max-w-none my-6"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AuthorHome;
