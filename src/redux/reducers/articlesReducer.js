const initialState = {
  articles: [],
  fullArticle: null,
  isLoading: true,
  isError: false,
  totalCount: 0,
  page: 1,
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload.articles,
        totalCount: action.payload.articlesCount,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_FULL_ARTICLE':
      return {
        ...state,
        fullArticle: action.payload.article,
      };
    case 'SET_LOADED':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload,
      };
    case 'SET_FAVORITE':
      return {
        ...state,
        articles: state.articles.map((el) => (el.slug === action.payload.slug ? action.payload : el)),
        fullArticle: state.fullArticle.slug === action.payload.slug ? action.payload : state.fullArticle,
        count: state.count + 1,
        checked: true,
      };
    default:
      return state;
  }
};
