import './TableCell.css';

function TableCell(props) {
  return (
    <p className={props.style + ' cell'}>{props.value}</p>
  )
}

export default TableCell;