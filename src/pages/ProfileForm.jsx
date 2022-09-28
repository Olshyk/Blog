import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../redux/actions/actionsUser';
import classes from '../styles/modal.module.css';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditError = useSelector((state) => state.user.isEditError);
  const isErrorName = useSelector((state) => state.user.isErrorName);
  const isErrorMail = useSelector((state) => state.user.isErrorMail);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isErrorName) {
      setError('username', { type: 'server', message: 'is already taken' });
    }
    if (isErrorMail) {
      setError('email', {
        type: 'server',
        message: 'is already taken',
      });
    }
  }, [setError, isErrorName, isErrorMail]);

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data));
    reset();
    if (isEditError) {
      navigate('/');
    }
  };

  return (
    <div className={classes.modal}>
      <h1 className={classes.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Username
          <input
            className={errors.username ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            placeholder="Username"
            defaultValue=""
            type="text"
            name="Username"
            {...register('username', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Username must be atleast 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Max length 20 characters',
              },
            })}
          />
          {errors.username && <p className={classes.error}>{errors.username.message}</p>}
        </label>
        <label className={classes.label}>
          Email Address
          <input
            className={errors.email ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            type="email"
            placeholder="Email address"
            name="Email"
            defaultValue=""
            {...register('email', {
              required: 'Provide a valid email',
              pattern: {
                value: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Provide a valid email',
              },
            })}
          />
          {errors.email && <p className={classes.error}>{errors.email.message}</p>}
        </label>
        <label className={classes.label}>
          New password
          <input
            className={errors.password ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            type="password"
            placeholder="New password"
            name="Password"
            defaultValue=""
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Your password needs to be atleast 6 characters',
              },
              maxLength: { value: 40, message: 'Max length 40 characters' },
            })}
          />
          {errors.password && <p className={classes.error}>{errors.password.message}</p>}
        </label>
        <label className={classes.label}>
          Avatar image (url)
          <input
            className={classes.input}
            type="url"
            placeholder="Avatar image"
            name="Avatar"
            defaultValue=""
            {...register('image')}
          />
        </label>
        {isEditError && <p className={classes.error}>Invalid data</p>}
        <button
          type="submit"
          name="submit"
          label="save"
          title="save"
          aria-label="Save information"
          className={classes.button}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
