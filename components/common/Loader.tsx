import React from 'react';

const Loader = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  return (
    <div className={`book-loader-wrapper ${size}`}>
      <div className="book">
        <div className="book__pg-shadow" />
        <div className="book__pg" />
        <div className="book__pg book__pg--2" />
        <div className="book__pg book__pg--3" />
        <div className="book__pg book__pg--4" />
        <div className="book__pg book__pg--5" />
      </div>
    </div>
  );
};

export default Loader;
