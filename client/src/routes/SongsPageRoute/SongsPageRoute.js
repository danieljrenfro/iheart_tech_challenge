import React, { useState, useEffect } from 'react';
import config from '../../config';

// Components
import ColumnHeader from '../../components/ColumnHeader/ColumnHeader';

// Styles
import './SongsPageRoute.css';

function SongsPageRoute() {
  // state
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [originalSort, setOriginalSort] = useState([]);

  // fetch request to API
  useEffect(() => {
    fetch(`${config.API_ENDPOINT}`)
      .then(res => {
        if (!res.ok) {
          return setError('Could not load songs...');
        }
        return res.json();
      })
      .then(songs => {
        setSongs([...songs]);
        setOriginalSort([...songs]);
      })
  }, []);

  // handling the header click and updated sortBy state
  const onHeaderClick = (header) => {
    if (sortBy !== header) {
      setSortBy(header);
      setOrderBy('asc');
      return;
    }
    
    if (sortBy === header) {
      if (orderBy === '') setOrderBy('asc');
      if (orderBy === 'asc') setOrderBy('desc');
      if (orderBy === 'desc') setOrderBy('no sort');
      if (orderBy === 'no sort') {
        setOrderBy('asc');
      }
    }
  }

  // generated column headers
  let columnHeaders = '';
  if (songs.length > 0) {
    columnHeaders = Object.keys(songs[0]).map((key, i) => {
      return <ColumnHeader 
        key={i} 
        title={key} 
        handleClick={onHeaderClick}
      />;
    })
  }

  // song sorting
  // no sort
  if (sortBy && orderBy === 'no sort') {
    setSongs([...originalSort]);
    setOrderBy('');
    setSortBy('');
  }

  // ascending sort
  if (orderBy === 'asc') {
    songs.sort((a, b) => {
      const fieldA = a[sortBy].toUpperCase();
      const fieldB = b[sortBy].toUpperCase();

      if (fieldA > fieldB)
        return -1;

      if (fieldA < fieldB)
        return 1;

      return 0;
    })
  }

  // descending sort
  if (orderBy === 'desc') {
    songs.sort((a, b) => {
      const fieldA = a[sortBy].toUpperCase();
      const fieldB = b[sortBy].toUpperCase();

      if (fieldA > fieldB)
        return 1;

      if (fieldA < fieldB)
        return -1

      return 0;
    })
  }


  return (
    <>
      <section className='details'>
        <h2>Songs Page</h2>
        <p>This is the Songs Table, where you can view all of the song data. Clicking the headers of different columns will sort the songs by that column.</p>
        <ul>
          <li>Clicking a column once will sort all songs, by that column, in ascending order.</li>
          <li>A second click on the same column will sort the songs in descending order, by that column.</li>
          <li>Finally, a third click on a column header will clear the sort.</li>
        </ul>
      </section>
      <section className='songs-table'>
        {songs.length === 0 ? <p>Loading songs...</p> : <></>}
        {error ? <p>{error}</p> : <></>}
        <div className="column-headers">
          {columnHeaders}
        </div>
      </section>
    </>

  )
}

export default SongsPageRoute;