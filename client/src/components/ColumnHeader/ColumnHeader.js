import './ColumnHeader.css';

function ColumnHeader(props) {
  return (
    <h3 onClick={() => props.handleClick(props.title)} className='column-header cell'>{props.title}</h3>
  );
}

export default ColumnHeader;