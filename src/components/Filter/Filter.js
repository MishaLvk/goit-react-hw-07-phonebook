import { useSelector, useDispatch } from 'react-redux';
import { changeFilterRedux } from '../redux/filterSlice';

export default function Filter() {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const changeFilter = event => {
    dispatch(changeFilterRedux(event.currentTarget.value));
  };

  return (
    <label className="Lable">
      filter
      <input type="text" value={filterValue} onChange={changeFilter}></input>
    </label>
  );
}
