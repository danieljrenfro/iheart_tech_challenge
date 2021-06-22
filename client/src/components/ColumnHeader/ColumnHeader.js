import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ColumnHeader.css';

function ColumnHeader(props) {
  
  const generateSortIcon = () => {
    if (props.title === props.sortBy && props.orderBy === 'asc')
      return <FontAwesomeIcon icon='sort-up'/>

    if (props.title === props.sortBy && props.orderBy === 'desc')
      return <FontAwesomeIcon icon='sort-down'/>

    return <></>;
  }
  
  return (
    <h3 onClick={() => props.handleClick(props.title)} className='column-header cell'>
      {props.title} {generateSortIcon()}
    </h3>
  );
}

export default ColumnHeader;