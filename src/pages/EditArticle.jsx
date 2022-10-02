import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';

import { getArticle, isLoading } from '../redux/actions/actionsArticle';
import { editArticle } from '../service';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const loading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const article = useSelector((state) => state.articles.fullArticle);

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  const onSubmit = (data) => {
    dispatch(isLoading(true));
    editArticle(data, slug).then((res) => {
      if (res.article) {
        dispatch(getArticle(res.article.slug));
        navigate(`/articles/${res.article.slug}`);
      }
    });
    dispatch(isLoading(false));
  };

  return (
    <>
      {loading && <Spin size="large" />}
      {!loading && !isError && article && (
        <ArticleForm onCreate={(data) => onSubmit(data)} title="Edit article" article={article} />
      )}
    </>
  );
};

export default EditArticle;
