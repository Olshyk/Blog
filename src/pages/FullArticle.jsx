import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin, Tag, Popconfirm } from 'antd';
import { uniqueId } from 'lodash/util';
import { format } from 'date-fns';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import classes from '../styles/article.module.css';
import { getArticle, deleteItem, likeArticle, dislikeArticle } from '../redux/actions/actionsArticle';

const FullArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const isLoading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const article = useSelector((state) => state.articles.fullArticle);
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  const onSubmit = () => {
    dispatch(deleteItem(slug));
    navigate('/');
  };

  const likeItem = () => {
    isLogin && dispatch(likeArticle(slug));
  };

  const dislikeItem = () => {
    isLogin && dispatch(dislikeArticle(slug));
  };

  return (
    <article className={classes['full-article']}>
      {(isLoading || !article) && <Spin size="large" />}
      {!isLoading && !isError && article && (
        <>
          <div className={classes.header}>
            <section className={classes.info}>
              <div>
                <h2 className={classes.title}>{article.title}</h2>
                {article.favorited ? (
                  <HeartFilled style={{ color: '#1890FF' }} className={classes.heart} onClick={dislikeItem} />
                ) : (
                  <HeartOutlined className={classes.heart} onClick={likeItem} />
                )}
                <span className={classes.likes}>{article.favoritesCount}</span>
              </div>
              <ul className={classes.taglist}>
                {article.tagList?.map(
                  (tag) =>
                    tag && (
                      <li key={uniqueId()}>
                        <Tag className={classes.tag}>{tag}</Tag>
                      </li>
                    )
                )}
              </ul>
              <p className={classes.description}>{article.description}</p>
            </section>
            <section className={classes.author}>
              <div>
                <div className={classes.name}>{article.author.username}</div>
                <div className={classes.date}>{format(new Date(article.createdAt), 'MMMM dd, yyyy')}</div>
              </div>
              <img src={article.author.image} alt="avatar" className={classes.image} />
              {article.author.username === user.username && (
                <div>
                  <Popconfirm
                    title="Are you sure to delete this article?"
                    onConfirm={onSubmit}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button
                      className={classes['button-delete']}
                      type="button"
                      title="delete"
                      aria-label="delete article"
                    >
                      Delete
                    </button>
                  </Popconfirm>
                  <button className={classes['button-edit']} type="button" title="edit" aria-label="edit article">
                    <Link style={{ color: '#52C41A' }} to={`/articles/${slug}/edit`}>
                      Edit
                    </Link>
                  </button>
                </div>
              )}
            </section>
          </div>
          <section className={classes.body}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </section>
        </>
      )}
    </article>
  );
};

export default FullArticle;
