import { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import 'moment/locale/ru'
import CrudContext from '../../Context/CrudContext';
import PropTypes from 'prop-types';

export default function ListItem({ item }) {
  const context = useContext(CrudContext);
  const { username, avatar, id, content, created, status } = item;
  const date = moment(new Date(created)).fromNow();

  const clickHandler = () => {
    context.post = { ...item, created: date };
    localStorage.setItem('post', JSON.stringify({ post: { ...item, created: date } }))
  }

  return (
    <li className="list__item">
      <article className="app__post post">
        <div className="post__body">
          <Link to={`/ra-9.2-router-crud-front/posts/${id}`} onClick={clickHandler}>
            <div className="post-body__header heading">
              <img src={avatar} alt={username} className="heading__avatar avatar" />
              <div className="heading__content heading-content">
                <div className="heading-content__title">{username}</div>
                <div className="heading-content__details details">
                  <span
                    className={status === 'admin'
                      ? "details__text-item text-item icon-stars"
                      : 'details__text-item text-item'} >
                  </span>
                  <span className="details__text-item text-item">{status === 'admin' ? 'Основатель группы' : 'Пользователь'} </span>
                  <span className="details__text-item text-item">{date}</span>
                </div>
              </div>
            </div>
            <div className="post-body__body post-body">
              {content}
            </div>
          </Link>
          <div className="post-body__footer post-footer">
            <button className="post-footer__text-item text-item">
              <span className="icon-thumb_up"></span>
              &nbsp;&nbsp;Нравится
            </button>
            <button className="post-footer__text-item text-item">
              <span className="icon-comment"></span>
              &nbsp;&nbsp;Комментарии
            </button>
          </div>
        </div>
        <div className="post__footer post-footer">
          <img src={avatar} alt={username} className="post-footer__avatar avatar" />
          <form action="" className="post-footer__form footer-form">
            <input placeholder="Напишите комментарий..." type="text" className="footer-form__input" />
            <button className="footer-form__btn icon-send"></button>
          </form>
        </div>
      </article>
    </li>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired
}