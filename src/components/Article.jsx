import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash/util';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import classes from '../styles/article.module.css';
import { likeArticle, dislikeArticle } from '../redux/actions/actionsArticle';

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const { slug, title, description, createdAt, tagList, favoritesCount, favorited, author } = article;
  const isLogin = useSelector((state) => state.user.isLogin);

  const likeItem = () => {
    isLogin && dispatch(likeArticle(slug));
  };

  const dislikeItem = () => {
    isLogin && dispatch(dislikeArticle(slug));
  };

  return (
    <article className={classes.article}>
      <section className={classes.info}>
        <div>
          <h2 className={classes.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h2>
          {favorited ? (
            <HeartFilled style={{ color: '#1890FF' }} className={classes.heart} onClick={dislikeItem} />
          ) : (
            <HeartOutlined className={classes.heart} onClick={likeItem} />
          )}
          <span className={classes.likes}>{favoritesCount}</span>
        </div>
        <ul className={classes.taglist}>
          {tagList?.map((tag) => (
            <li key={uniqueId()}>
              <Tag className={classes.tag}>{tag}</Tag>
            </li>
          ))}
        </ul>
        <p className={classes.description}>{description}</p>
      </section>
      <section className={classes.author}>
        <div>
          <div className={classes.name}>{author.username}</div>
          <div className={classes.date}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</div>
        </div>
        <img src={author.image} alt="avatar" className={classes.image} />
      </section>
    </article>
  );
};

Article.defaultProps = {
  article: {},
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object),
};

export default Article;
