import { getArticles, getFullArticle, deleteArticle, like, dislike } from '../../service';

export const setArticles = (payload) => ({
  type: 'SET_ARTICLES',
  payload,
});

export const setFullArticle = (payload) => ({
  type: 'SET_FULL_ARTICLE',
  payload,
});

export const isLoading = (payload) => ({ type: 'SET_LOADED', payload });

export const setPage = (payload) => ({ type: 'SET_PAGE', payload });

export const setError = (payload) => ({ type: 'SET_ERROR', payload });

export const setFavorite = (payload) => ({ type: 'SET_FAVORITE', payload });

export const getArticlesList = (page) => (dispatch) => {
  dispatch(isLoading(true));
  getArticles(page)
    .then((res) => {
      dispatch(setArticles(res));
      dispatch(isLoading(false));
      dispatch(setError(false));
    })
    .catch((e) => console.log(`error  ${e}`), dispatch(setError(true)));
};

export const getArticle = (slug) => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const res = await getFullArticle(slug);
    dispatch(setFullArticle(res));
    dispatch(isLoading(false));
    dispatch(setError(false));
  } catch (e) {
    console.log(`error ${e}`);
    dispatch(setError(true));
  }
};

export const deleteItem = (slug) => async (dispatch) => {
  dispatch(isLoading(true));
  deleteArticle(slug);
  dispatch(isLoading(false));
};

export const likeArticle = (slug) => async (dispatch) => {
  try {
    const res = await like(slug);
    dispatch(setFullArticle(res));
    dispatch(setFavorite(res.article));
  } catch (e) {
    console.log(`error ${e}`);
  }
};

export const dislikeArticle = (slug) => async (dispatch) => {
  try {
    const res = await dislike(slug);
    dispatch(setFullArticle(res));
    dispatch(setFavorite(res.article));
  } catch (e) {
    console.log(`error ${e}`);
  }
};
