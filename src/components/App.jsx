import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ArticlesList from '../pages/ArticlesList';
import FullArticle from '../pages/FullArticle';
import SignUpForm from '../pages/SignUpForm';
import SignInForm from '../pages/SignInForm';
import ProfileForm from '../pages/ProfileForm';
import CreateArticle from '../pages/CreateArticle';
import EditArticle from '../pages/EditArticle';

import Header from './Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<FullArticle />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
      </Routes>
    </>
  );
};

export default App;
