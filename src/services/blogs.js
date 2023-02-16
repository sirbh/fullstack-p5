import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: token,
    },
  });
  return request.then((response) => response.data);
};

const update = (updatedBlog,id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, {
    headers: {
      Authorization: token,
    },
  });

  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  }) 
  return request.then(data=>data.response)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove };
