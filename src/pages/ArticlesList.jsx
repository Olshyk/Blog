import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import 'antd/dist/antd.css';

import { getArticlesList, setPage } from '../redux/actions/actionsArticle';
import Article from '../components/Article';
import classes from '../styles/pagination.module.css';

const ArticlesList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.articles.articles);
  const totalCount = useSelector((state) => state.articles.totalCount);
  const isLoading = useSelector((state) => state.articles.isLoading);
  const page = useSelector((state) => state.articles.page);

  useEffect(() => {
    dispatch(getArticlesList(page));
  }, [dispatch, page]);

  const updatePage = async (curr) => {
    dispatch(setPage(curr));
    window.scrollTo(0, 0);
  };

  const spinner = isLoading ? <Spin size="large" /> : null;
  const content = data && data.map((item) => <Article key={item.slug} article={item} />);

  return (
    <div className={classes.list}>
      {spinner}
      {content}
      <Pagination
        className={classes.pagination}
        size="small"
        onChange={updatePage}
        current={page}
        total={totalCount}
        pageSize={5}
      />
    </div>
  );
};

export default ArticlesList;
