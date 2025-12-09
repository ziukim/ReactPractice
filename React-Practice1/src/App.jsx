import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from './pages/Board';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import PostEdit from './pages/PostEdit';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import { initializeSampleData } from './utils/sampleData';
import { storage } from './utils/storage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  useEffect(() => {
    // 앱 시작 시 샘플 데이터 초기화 (데이터가 없을 때만)
    initializeSampleData(storage);
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board" element={<Board />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/write" element={<PostWrite />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
