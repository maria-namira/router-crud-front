import { Fragment, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

export default function NewPost() {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = async () => {
    if (inputVal.trim() === '') {
      return;
    }
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: inputVal,
        id: nanoid(10)
      })
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, options);
      if (!response.ok) {
        throw new Error('Ошибка добавления поста')
      }
      setClick(true)
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  const handleChange = (evt) => setInputVal(evt.target.value);

  return (
    <Fragment>
      {(!error && loading) && <Loading />}
      {error && <Error error={error} errorHandler={(value) => setError(value)} />}
      <div className="app__addform addform">
        <div className="addform__btn-box btn-box">
          <Link to={'/router-crud-front/'} className="addform__btn icon-close" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} name={'add'} className="addform__form form">
          <div className="form__textarea-box">
            <textarea value={inputVal} onChange={handleChange} placeholder="Введите текст..." cols="30" rows="10" className="form__input" />
          </div>
          <div className="form__btn-box btn-box">
            <button onClick={handleClick} className="form__btn">
              {click && <Navigate to="/router-crud-front/" />}
              Опубликовать</button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}