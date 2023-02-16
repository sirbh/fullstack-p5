import { useEffect, useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentBlog, setCurrentBlog] = useState();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const loggedInUsername = JSON.parse(
    window.localStorage.getItem("user")
  ).username;
  const likeHandler = async () => {
    const updatedBlog = await blogServices.update(
      {
        ...currentBlog,
        user: currentBlog.user.id,
        likes: currentBlog.likes + 1,
      },
      blog.id
    );

    setCurrentBlog((blog) => {
      return {
        ...blog,
        likes: updatedBlog.likes,
      };
    });
  };

  useEffect(() => {
    setCurrentBlog(blog);
    console.log("i ran");
  }, [blog]);

  if (!currentBlog) {
    return <div></div>;
  }

  return (
    <div style={blogStyle}>
      <p>
        {currentBlog.title} {currentBlog.author}
        <button
          onClick={() => {
            setShowDetails((prev) => !prev);
          }}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </p>
      {showDetails && (
        <>
          <a href={currentBlog.url}>{currentBlog.url}</a>
          <p>
            {currentBlog.likes}
            <button onClick={likeHandler}>Like</button>
          </p>
          <p>{currentBlog.user.name}</p>
          {loggedInUsername === blog.user.username ? (
            <button
              onClick={() => {
                handleDelete(
                  currentBlog.id,
                  currentBlog.title,
                  currentBlog.author
                );
              }}
            >
              remove
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
