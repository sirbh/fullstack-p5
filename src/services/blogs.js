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

const create = (blogDetails) => {

  const blog = {
    title:blogDetails.title,
    author:blogDetails.author,
    url:blogDetails.url,
  };
  const request = axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken };
