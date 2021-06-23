import React, { useState, useEffect } from 'react';
import config from '../../config';

import ColumnHeader from '../../components/ColumnHeader/ColumnHeader';
import TableRow from '../../components/TableRow/TableRow';

import './SongsPageRoute.css';

function SongsPageRoute() {
  // state
  const [songs, setSongs] = useState([]);
  const [originalSort, setOriginalSort] = useState([]);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');

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
      .catch(() => {
        return setError('Could not load songs...');
      })
  }, []);

  // song sorting
  const sortSongs = (header, order) => {
    // no sort
    if (order === 'no sort') {
      setSongs(originalSort);
    } else {
      const sortedSongs = [...songs].sort((a, b) => {
        const fieldA = (typeof a[header] === 'string') ? a[header].toUpperCase() : a[header];
        const fieldB = (typeof b[header] === 'string') ? b[header].toUpperCase() : b[header];
        
        if (fieldA > fieldB)
          return (order === 'asc') ? -1 : 1;
  
        if (fieldA < fieldB)
          return (order === 'asc') ? 1 : -1;
  
        return 0;
      })
      
      setSongs(sortedSongs);
    }
  }

  // handling the header click and updating sortBy state
  const onHeaderClick = (header) => {
    let sortOrder = 'asc';

    if (sortBy !== header) setSortBy(header);
    if (orderBy === 'asc' && sortBy === header) sortOrder = 'desc';
    if (orderBy === 'desc' && sortBy === header) sortOrder = 'no sort';

    setOrderBy(sortOrder);
    sortSongs(header, sortOrder);
  }
  

  // generate column headers
  let columnHeaders;
  if (songs.length > 0) {
    columnHeaders = Object.keys(songs[0]).map((key, i) => {
      return <ColumnHeader 
        key={i} 
        title={key} 
        handleClick={onHeaderClick}
        orderBy={orderBy}
        sortBy={sortBy}
      />;
    })
  }

  // generate song rows
  let tableRows
  if (songs.length > 0) {
    tableRows = songs.map((song, i) => {
      return <TableRow
        key={i}  
        line={i}
        song={song}
      />
    })
  }

  return (
    <>
      <section className='details'>
        <h2>Songs Page</h2>
        <p>This is the Songs Table, where you can view all of the song data. Clicking the headers of different columns will sort the songs by that column.</p>
        
        {songs.length === 0 ? <p>Loading songs...</p> : null}
      </section>
      <section className='songs-table'>
        {error ? <p>{error}</p> : null}

        <div className="column-headers">
          {columnHeaders}
        </div>
        <div className='table-rows'>
          {tableRows}
        </div>
      </section>
    </>

  )
}

export default SongsPageRoute;