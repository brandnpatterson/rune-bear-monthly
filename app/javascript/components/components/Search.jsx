import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { array, func, string } from 'prop-types'
import MdSearch from 'react-icons/lib/md/search'
import styled from 'styled-components'

const propTypes = {
  changeQuarter: func.isRequired,
  filteredArticles: array.isRequired,
  quarter: string.isRequired,
  search: string.isRequired,
  updateSearch: func.isRequired
}

const Search = ({ changeQuarter, filteredArticles, quarter, search, updateSearch }) => {
  const testForMatch = e => {
    filteredArticles.map(article => {
      if (e.target.innerHTML === article.title) {
        changeQuarter(article.id_quarter)
      }
    })
  }

  return (
    <SearchInput autoComplete="off">
      <input
        className="search__input"
        type="text"
        onChange={updateSearch}
        placeholder="Search"
        value={search}
      />
      <ul className="search__result">
        {filteredArticles.map(article => (
          <Link
            className={"search__result--item" + (search === '' ? " hidden" : '')}
            key={article.id}
            onClick={testForMatch}
            to={`/${article.id_quarter}/${article.id_react}`}
          >
            <li>{article.title}</li>
          </Link>
        ))}
      </ul>
      <MdSearch className="search__icon" />
    </SearchInput>
  )
}
Search.propTypes = propTypes

const SearchInput = styled.div `
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  @media (max-width: 700px) {
    margin-left: 3.2em;
  }
  .hidden {
    display: none;
  }
  .search {
    &__input {
      color: gray;
      font-size: 14px;
      height: 28px;
      margin-right: 0.5em;
      border: 1px solid #eee;
    }
    &__result {
      position: absolute;
      top: 3em;
      left: -2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      &--item {
        background: white !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        width: 90%;
      }
      &--active {
        background: #f1f1f1;
      }
    }
    &__icon {
      color: gray;
      font-size: 22px;
    }
  }
`

export default Search
