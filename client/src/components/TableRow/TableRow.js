import TableCell from '../TableCell/TableCell';

import './TableRow.css';

function TableRow(props) {
  let rowCells;
  if (props.song) {
    rowCells = Object.values(props.song).map((attribute, i) => {
      return <TableCell key={i} value={attribute}/>
    })
  }
  
  return (
    <div
      className={props.line % 2 === 0 ? 'row dark' : 'row light'}
    >
      {rowCells}
    </div>
  )
}

export default TableRow;