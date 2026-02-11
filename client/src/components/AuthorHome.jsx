import React, { useEffect, useRef, useState } from "react";
import Editor from "./RichTextEditor/Editor";
import { createPost, getMyPosts } from "../api/services/postServices";
import Quill from "quill";
import "./Editor.css";
import Post from "./Post";
import { uploadImage } from "../api/services/imageServices";
import "quill/dist/quill.snow.css";

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
        description: JSON.stringify(quillRef.current.getContents()),
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

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) {
        console.warn("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await uploadImage(formData);

        const { url: imageUrl } = res.data;

        const range = quillRef.current.getSelection();
        if (!range) return;
        quillRef.current.insertEmbed(range.index, "image", imageUrl);
      } catch (err) {
        console.error("Image upload failed", err);
      }
    };
  };

  return (
    <div className="m-2">
      <div className="w-full md:w-2/3 mx-auto editorbox">
        <Editor
          ref={quillRef}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
          imageHandler={imageHandler}
        />
        <div className="controls">
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
          let delta = JSON.parse(post.description);
          const html = deltaToHTML(delta);
          return <Post key={post._id} html={html} />;
        })}
      </div>
    </div>
  );
}

export default AuthorHome;
