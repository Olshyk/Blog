import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

import classes from '../styles/modal.module.css';

const ArticleForm = ({ onCreate, article, title }) => {
  const { register, handleSubmit, control } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...article,
      tagList: [article.tagList.map((tag) => ({ name: tag }))],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    const filtered = {
      ...data,
      tagList: data.tagList.length ? data.tagList.map((el) => el.name) : [],
    };
    onCreate(filtered);
  };

  const tagsBlock = fields.map((el, idx) => {
    return (
      <li className={classes.tags} key={el.id}>
        <input
          className={classes.input}
          style={{ width: 300, marginBottom: 5 }}
          type="text"
          placeholder="Tag"
          {...register(`tagList.${idx}.name`)}
        />
        <button
          className={classes['button-delete']}
          type="button"
          title="delete tag"
          aria-label="delete tag"
          onClick={() => remove(idx)}
        >
          Delete
        </button>
        {fields.indexOf(fields[fields.length - 1]) === idx && (
          <button
            className={classes['button-add']}
            type="button"
            title="add tag"
            aria-label="add tag"
            onClick={() => append({ name: '' })}
          >
            Add Tag
          </button>
        )}
      </li>
    );
  });

  return (
    <div className={classes.modal} style={{ width: 938 }}>
      <h1 className={classes.title}>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Title
          <input
            className={classes.input}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: true,
            })}
          />
        </label>
        <label className={classes.label}>
          Short description
          <input
            className={classes.input}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: true,
            })}
          />
        </label>
        <label className={classes.label}>
          Text
          <textarea
            className={classes.input}
            rows={7}
            type="text"
            placeholder="Text"
            {...register('body', {
              required: true,
            })}
          />
        </label>
        <label className={classes.label}>
          Tags
          <ul>{tagsBlock}</ul>
        </label>
        <button
          type="submit"
          title="send"
          label="send"
          aria-label="submit article"
          className={classes.button}
          style={{ width: 319 }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

ArticleForm.defaultProps = {
  onCreate: () => {},
  article: {},
  title: 'Create article',
};

ArticleForm.propTypes = {
  onCreate: PropTypes.func,
  article: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

export default ArticleForm;
