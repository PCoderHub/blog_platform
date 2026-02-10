import React from "react";

function Post({ html }) {
  return (
    <div
      className="prose max-w-none my-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Post;
