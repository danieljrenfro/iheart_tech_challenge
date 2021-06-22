import './TableCell.css';

function TableCell(props) {
  return (
    <p className='cell'>{props.value}</p>
  )
}

export default TableCell;