import { Link } from 'react-router-dom'
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import useFetch from '../../hooks/useFetch';

export default function List() {
  const { data, error, loading, errorHandler } = useFetch(`${process.env.REACT_APP_BASE_URL}`, '/posts')

  return (
    <>
      {error && <Error error={error} errorHandler={errorHandler} />}
      {(!error && loading) && <Loading />}
      <header className="app__form">
        <Link to="/ra-9.2-router-crud-front/posts/new" className='app-form__btn'>Создать пост</Link>
      </header>
      <ul className="app__list list">
        {data && data.map((e) => <ListItem key={e.id} item={e} />)}
      </ul>
    </>
  )
}