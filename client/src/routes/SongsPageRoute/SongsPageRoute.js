import React, { useState, useEffect } from 'react';
import config from '../../config';

// Components
import ColumnHeader from '../../components/ColumnHeader/ColumnHeader';
import TableRow from '../../components/TableRow/TableRow';

// Styles
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
  }, []);

  // song sorting
  const sortSongs = (header, order) => {
    // no sort
    if (order === 'no sort') {
      setSongs(originalSort);
    } else {
      let sortedSongs = [...songs].sort((a, b) => {
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
    if (orderBy === 'asc') sortOrder = 'desc';
    if (orderBy === 'desc') sortOrder = 'no sort';

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
        <ul>
          <li>Clicking a column once will sort all songs, by that column, in ascending order.</li>
          <li>A second click on the same column will sort the songs in descending order, by that column.</li>
          <li>Finally, a third click on a column header will clear the sort.</li>
        </ul>
      </section>
      <section className='songs-table'>
        {songs.length === 0 ? <p>Loading songs...</p> : null}
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