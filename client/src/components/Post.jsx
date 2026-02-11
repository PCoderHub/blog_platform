import React from "react";
import "quill/dist/quill.snow.css";

function Post({ html }) {
  return (
    <div className="border w-2/3 mx-auto m-5">
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default Post;
