import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  (
    { readOnly, defaultValue, onTextChange, onSelectionChange, imageHandler },
    ref,
  ) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const imageHandlerRef = useRef(imageHandler);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      imageHandlerRef.current = imageHandler;
    }, [onTextChange, onSelectionChange, imageHandler]);

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],

              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
            ],
            handlers: {
              image: imageHandlerRef.current,
            },
          },
        },
        placeholder: "Tell us your story...",
        theme: "snow",
      });

      quill.root.addEventListener("paste", (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            e.preventDefault();
            alert("Please use the image upload button.");
            return;
          }
        }
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";

export default Editor;
