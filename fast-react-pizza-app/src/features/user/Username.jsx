import { useSelector } from 'react-redux';
import { getUserName } from './userSlice';

function Username() {
  const username = useSelector(getUserName);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;

/*
//REDUX NOTE

4) useSelectore( callback function()=> takes the state out of the user "as named in the store.reducer" ) hook to return the state out of the redux store



*/
