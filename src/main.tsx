import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import VideoPage from './pages/video/index.tsx'
import VideoDetailPage from './pages/video/detail.tsx';
import AuthPage from './pages/auth/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoPage/>,
  },
  {
    path: "/video/:id",
    element: <VideoDetailPage/>
  },
  {
    path: "/auth",
    element: <AuthPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>,
)
