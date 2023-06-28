import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import CrudContext from '../../Context/CrudContext';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

export default function PostEdit() {
  const state = useContext(CrudContext);
  const context = state.post ? state : JSON.parse(localStorage.getItem('post'));
  const [inputVal, setInputVal] = useState(context.post.content);
  const [click, setClick] = useState(false);
  const [error, setError] = useState(null);;
  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    setInputVal(evt.target.value);
  }

  const handleClick = async () => {
    if (inputVal.trim() === '') {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...context.post, content: inputVal })
      })
      if (!response.ok) {
        throw new Error('Ошибка сохранения поста');
      }
      context.post.content = inputVal;
      localStorage.setItem('post', JSON.stringify({post: {...context.post, content: inputVal}}))
      setClick(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {(!error && loading) && <Loading />}
      {error && <Error error={error} errorHandler={(value) => setError(value)} />}
      <div className="app__addform addform">
        <div className="addform__btn-box btn-box editing">
          <img className='heading__avatar avatar' src={context.post.avatar} alt="" />
          <div className="addform__title">Редактировать публикацию</div>
          <Link to={`/router-crud-front/posts/${context.id}`} className="addform__btn icon-close"></Link>
        </div>
        <div id="add" name="add" action="" className="addform__form form">
          <div className="form__textarea-box">
            <textarea
              value={inputVal}
              onChange={handleChange}
              placeholder="Введите текст..."
              cols="30" rows="10"
              className="form__input">
            </textarea>
          </div>
          <div className="form__btn-box btn-box">
            <button onClick={handleClick} className="form__btn">
              {click && <Navigate to={`/router-crud-front/posts/${context.post.id}`} />}Сохранить
            </button>
          </div>
        </div>
      </div>
    </>

  )
}