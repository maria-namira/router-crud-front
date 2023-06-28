import { Routes, Route } from 'react-router-dom';
import List from '../List/List';
import NewPost from '../NewPost/NewPost';
import PostEdit from '../PostEdit/PostEdit';
import PostView from '../PostView/PostView';

export default function MainPage() {

  return (
    <div className="app">
      <Routes>
        <Route path='/router-crud-front/' element={<List />} />
        <Route path='/router-crud-front/posts/new' element={<NewPost />} />
        <Route path='/router-crud-front/posts/:id' element={<PostView />} />
        <Route path='/router-crud-front/posts/edit' element={<PostEdit />} />
      </Routes>
    </div>
  )
}