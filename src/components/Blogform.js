const Blogform = ({
    handleSubmit,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
  }) => {
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Username"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  };
  
  export default Blogform;
  