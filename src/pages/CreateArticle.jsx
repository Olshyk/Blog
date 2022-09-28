import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createArticle } from '../service';
import { getArticle } from '../redux/actions/actionsArticle';
import ArticleForm from '../components/ArticleForm';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate('/sign-in');
    }
  }, [isLogin, navigate]);

  const onSubmit = (data) => {
    createArticle(data).then((res) => {
      if (res.article) {
        dispatch(getArticle(res.article.slug));
        navigate(`/articles/${res.article.slug}`);
      }
      if (res.errors) {
        console.log('err');
      }
    });
  };

  return <ArticleForm onCreate={(data) => onSubmit(data)} title="Create article" article={{ tagList: [''] }} />;
};

export default CreateArticle;
