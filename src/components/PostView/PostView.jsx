import { useState } from 'react';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import CrudContext from '../../Context/CrudContext';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

export default function PostView() {
  const state = useContext(CrudContext);
  const context = state.post ? state : JSON.parse(localStorage.getItem('post'));
  if (localStorage.getItem('post')) {
    state.post = JSON.parse(localStorage.getItem('post')).post;
  }
  const [click, setClick] = useState(false)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { username, avatar, id, content, created, status } = context.post;


  const deleteHandler = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Ошибка удаления поста')
      }
      setClick(true);
    } catch (err) {
      setError(err.message);
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <Error error={error} errorHandler={(value) => setError(value)} />}
      {(!error && loading) && <Loading />}
      <div className="app__post post">
        <div className="post__body">
          <div className="post-body__header heading">
            <img
              src={avatar}
              alt={username}
              className="heading__avatar avatar"
            />
            <div className="heading__content heading-content">
              <div className="heading-content__title">{username}</div>
              <div className="heading-content__details details">
                <span className="details__text-item text-item icon-stars"></span>
                <span className="details__text-item text-item">{status === 'admin'
                  ? 'Основатель группы'
                  : 'Пользователь'}
                </span>
                <span className="details__text-item text-item">{created}</span>
              </div>
            </div>
            <Link to={'/router-crud-front/'} className="heading__btn icon-close"></Link>
          </div>
          <div className="post-body__body post-body">
            {content}
          </div>
          <div className="post-body__footer post-footer">
            <button className="post-footer__text-item text-item">
              <span className="icon-thumb_up"></span>&nbsp;&nbsp;Нравится
            </button>
            <button className="post-footer__text-item text-item">
              <span className="icon-comment"></span>&nbsp;&nbsp;Комментарии
            </button>
          </div>
        </div>
        <div className="post__footer post-footer edit">
          <div className="form__btn-box btn-box">
            <Link to={'/router-crud-front/posts/edit'} className="form__btn">Изменить</Link>
          </div>
          <div className="form__btn-box btn-box delete">
            <button onClick={deleteHandler} className="form__btn">Удалить</button>
            {click && <Navigate to="/ra-9.2-router-crud-front/" />}
          </div>
        </div>
      </div>
    </>
  )
}