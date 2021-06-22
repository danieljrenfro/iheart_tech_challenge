import React, { useState, useEffect } from 'react';
import config from '../../config';

import './SongsPageRoute.css';

function SongsPageRoute() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

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
      })
  }, []);
  
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
      </section>
    </>

  )
}

export default SongsPageRoute;