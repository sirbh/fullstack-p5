import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import authServices from "./services/auth";
import Loginform from "./components/Loginform";
import Blogs from "./components/Blogs";
import Blogform from "./components/Blogform";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storeduser = window.localStorage.getItem("user");
    if (storeduser) {
      const userObj = JSON.parse(storeduser)
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authServices.login(username, password);
      setUser(user);
      window.localStorage.setItem("user",JSON.stringify(user)
      );
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title,author,url
      })
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(blogs=>{
        return blogs.concat(blog)
      })
      setMessage(`new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }catch{
      setMessage("blog cannot be created");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }
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
          <Blogs blogs={blogs} />
          <Blogform
            author={author}
            title={title}
            url={url}
            setAuthor={(a) => setAuthor(a)}
            setTitle={(t) => setTitle(t)}
            setUrl={(b) => setUrl(b)}
            handleSubmit= {handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default App;
