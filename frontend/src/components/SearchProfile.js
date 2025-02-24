import React from 'react';

const SearchProfile = () => {
  return (
    <div className="search-profile">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="profile-logo">
        <a href="/login">
          <i className="fa-solid fa-circle-user"></i>
        </a>
      </div>
    </div>
  );
};

export default SearchProfile;
