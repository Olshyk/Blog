import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../redux/actions/actionsUser';
import classes from '../styles/modal.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const isError = useSelector((state) => state.user.isError);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isError) {
      setError('email', { type: 'server' });
      setError('password', { type: 'server' });
    }
    if (isLogin) {
      navigate('/');
    }
  }, [isError, setError, isLogin, navigate, errors]);

  const onSubmit = (data) => {
    dispatch(auth(data));
  };

  return (
    <div className={classes.modal}>
      <h1 className={classes.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Email address
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
          Password
          <input
            className={errors.password ? `${classes.input} ${classes.invalid}` : `${classes.input}`}
            type="password"
            placeholder="Password"
            name="Password"
            defaultValue=""
            {...register('password', {
              required: 'Input your password',
              minLength: { value: 6, message: 'Input your password' },
              maxLength: { value: 40, message: 'Password is invalid' },
            })}
          />
          {errors.password && <p className={classes.error}>{errors.password.message}</p>}
        </label>
        {(errors.email?.type === 'server' || errors.password?.type === 'server') && (
          <p className={classes.error}>Email or password is invalid</p>
        )}
        <button type="submit" title="login" aria-label="login" className={classes.button}>
          Login
        </button>
        <p className={classes.note}>
          Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
