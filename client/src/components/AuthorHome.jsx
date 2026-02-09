import React, { useEffect, useRef, useState } from "react";
import Editor from "./RichTextEditor/Editor";
import { getMyPosts } from "../api/services/postServices";
import Quill from "quill";

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
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="m-2">
      <div className="w-full md:w-1/2 mx-auto">
        <Editor
          ref={quillRef}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </div>
      <div>
        <h2 className="text-center my-10 font-bold text-xl text-red-800">
          My Posts
        </h2>
      </div>
    </div>
  );
}

export default AuthorHome;
