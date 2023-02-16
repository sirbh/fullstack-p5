import Blog from "./Blog";
import PropTypes from "prop-types"

const Blogs = ({ blogs, handleDelete }) => {
  const sortedBlogs = blogs.sort((a,b)=>b.likes-a.likes)
  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
      ))}
    </>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blogs;
