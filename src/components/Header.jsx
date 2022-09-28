import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, logOut } from '../redux/actions/actionsUser';
import avatar from '../assets/avatar.png';
import classes from '../styles/header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logOut());
    localStorage.clear();
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    savedUser && dispatch(setUser(savedUser));
  }, [dispatch]);

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        Realworld Blog
      </Link>
      {!isLogin && (
        <div>
          <Link to="sign-in" className={classes['sign-in']}>
            Sign In
          </Link>
          <Link to="sign-up" className={classes['sign-up']}>
            Sign Up
          </Link>
        </div>
      )}
      {isLogin && (
        <div className={classes.user}>
          <Link to="/new-article" className={classes.create}>
            Create article
          </Link>
          <Link to="/profile">
            <span className={classes.username}>{user.username}</span>
            <img src={user.image || avatar} alt="avatar" width="46" height="46" className={classes.img} />
          </Link>
          <Link to="/" onClick={logout} className={classes.logout}>
            Log out
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
