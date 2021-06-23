import TableCell from '../TableCell/TableCell';

import './TableRow.css';

function TableRow(props) {
  let rowCells;
  if (props.song) {
    rowCells = props.columnOrder.map((attribute, i) => {
      return <TableCell 
        key={i} 
        value={props.song[attribute]}
        style={props.line % 2 === 0 ? 'dark' : 'light'}/>
    })
  }
  
  return (
    <div className='row'>
      {rowCells}
    </div>
  )
}

export default TableRow;