// Place any components you want to persist accross all pages

import React from 'react';

import Navbar from './components/Navbar';

import Watermark from './components/Watermark';

import NotificationsPanal from './components/NotificationsPanal';

export default function index({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <NotificationsPanal />
      <Watermark />

      <h5>HAP v1.6.5 Released: Aug 4, 2021</h5>
    </div>
  );
}
