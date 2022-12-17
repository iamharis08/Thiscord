import React, { useState, useEffect } from 'react';
// import { createServer } from '../../store/server'
// import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./SearchResults.css"
// import "../../css/Channel.css"


export default function SearchResultsModal({ setShowSearchResults, messages }) {

  console.log(messages[0], 'MESSAGES IN MODAL')
  return (
    <div className='search-result-container'>
      {messages && messages?.map((message, i) => (
        <div key={i}
          className='single-message-container'
        >
          <div className='single-message-user-info'>
            <span className='single-message-username'> {message?.user?.username} </span>
            <span className='single-message-user-timestamp'> {message?.createdAt} </span>
          </div>
          <div className='single-message-message-info'>
            {message?.message}
          </div>
        </div>
      ))}
      {messages.length === 0 && (
        <div className='no-results-found'>
          <div className='no-results-header'>
            No Messages Found
          </div>
          <div className='no-results-subheader'>
            Can't find what you're looking for? Refine search and try again
          </div>
        </div>
      )}
      {/* <button
        onClick={() => setShowSearchResults(false)}>
        '(click to close)'
      </button> */}
    </div>
  )
}
