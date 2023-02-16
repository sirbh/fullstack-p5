import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import authServices from "./services/auth";
import Loginform from "./components/Loginform";
import Blogs from "./components/Blogs";
import Blogform from "./components/Blogform";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storeduser = window.localStorage.getItem("user");
    if (storeduser) {
      const userObj = JSON.parse(storeduser);
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authServices.login(username, password);
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setPassword("");
      setUsername("");
    } catch {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(undefined);
    blogService.setToken("");
  };

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs((blogs) => {
        return blogs.concat({
          ...blog,
          user: {
            name: user.name,
            id: blog.user,
            username: user.username,
          },
        });
      });
      setMessage(`new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage("blog cannot be created");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`))
      await blogService.remove(id);
    setBlogs((blogs) => {
      return blogs.filter((blog) => {
        return blog.id !== id;
      });
    });
  };
  return (
    <div>
      {message && <p>{message}</p>}
      {!user && (
        <Loginform
          password={password}
          username={username}
          handleLogin={handleLogin}
          setPassword={(p) => setPassword(p)}
          setUsername={(u) => setUsername(u)}
        />
      )}
      {user && (
        <>
          <h2>Blogs</h2>
          <p>
            {`${user.name} is logged in`}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Blogs blogs={blogs} handleDelete={handleDelete} />
          <Togglable buttonLabel={"create"}>
            <Blogform createBlog={createBlog} />
          </Togglable>
        </>
      )}
    </div>
  );
};

export default App;
