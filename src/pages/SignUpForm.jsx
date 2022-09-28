import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Checkbox } from 'antd';

import { registration, isErrorUsername, isErrorEmail } from '../redux/actions/actionsUser';
import classes from '../styles/modal.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isErrorName = useSelector((state) => state.user.isErrorName);
  const isErrorMail = useSelector((state) => state.user.isErrorMail);
  const isLogin = useSelector((state) => state.user.isLogin);

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const password = useRef();
  password.current = watch('password');

  useEffect(() => {
    if (isErrorName) {
      setError('username', { type: 'server', message: 'is already taken' });
    }
    if (isErrorMail) {
      setError('email', {
        type: 'server',
        message: 'Account is already exists',
      });
    }
    if (isLogin) {
      navigate('/');
    }
  }, [dispatch, setError, isErrorName, isErrorMail, isLogin, navigate]);

  const onSubmit = (data) => {
    dispatch(registration(data));
    dispatch(isErrorUsername(false));
    dispatch(isErrorEmail(false));
  };

  return (
    <div className={classes.modal}>
      <h1 className={classes.title}>Create new account</h1>
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
          {errors.email?.type === 'server' && (
            <p className={classes.error}>
              Please, <Link to="/sign-in">Sign In</Link>
            </p>
          )}
        </label>
        <label className={classes.label}>
          Password
          <input
            className={errors.password ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            type="password"
            placeholder="Password"
            name="Password"
            defaultValue=""
            {...register('password', {
              required: true,
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
          Repeat Password
          <input
            className={errors.repeatPassword ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            type="password"
            placeholder="Repeat Password"
            name="RepeatPassword"
            defaultValue=""
            {...register('repeatPassword', {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.repeatPassword && <p className={classes.error}>Passwords must match</p>}
        </label>
        <Checkbox defaultChecked required className={classes.checkbox}>
          I agree to the processing of my personal information
        </Checkbox>
        <button type="submit" label="create" title="create" aria-label="Create account" className={classes.button}>
          Create
        </button>
        <p className={classes.note}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
