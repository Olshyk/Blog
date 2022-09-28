import axios from 'axios';

const URL = 'https://blog.kata.academy/api/';
const user = JSON.parse(localStorage.getItem('user'));
const token = user === null ? '' : user.token;

export const getArticles = async (page = 1) => {
  const offset = (page - 1) * 5;
  const data = await axios
    .get(`${URL}articles?limit=5&offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data;
};

export const getFullArticle = async (slug) => {
  const result = await axios
    .get(`${URL}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return result;
};

export const createUser = async (data) => {
  const result = await axios
    .post(
      `${URL}users`,
      {
        user: data,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data.errors);
  return result;
};

export const login = async (data) => {
  const result = await axios
    .post(
      `${URL}users/login`,
      {
        user: data,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log('err.response', err.response);
    });
  localStorage.setItem('token', JSON.stringify(result.user.token));
  localStorage.setItem('user', JSON.stringify(result.user));
  return result;
};

export const updateUser = async (data) => {
  const result = await axios
    .put(
      `${URL}user`,
      {
        user: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log('err.response', err.response);
    });
  return result;
};

export const createArticle = async (data) => {
  const result = await axios
    .post(
      `${URL}articles`,
      {
        article: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log('err.response', err.response);
    });
  return result;
};

export const editArticle = async (data, slug) => {
  const result = await axios
    .put(
      `${URL}articles/${slug}`,
      {
        article: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return result;
};

export const deleteArticle = async (slug) => {
  const result = await axios
    .delete(`${URL}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return result;
};

export const like = async (slug) => {
  const result = await axios
    .post(
      `${URL}/articles/${slug}/favorite`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return result;
};

export const dislike = async (slug) => {
  const result = await axios
    .delete(`${URL}/articles/${slug}/favorite`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return result;
};
