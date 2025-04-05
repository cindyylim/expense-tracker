import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFoundPage';
import { useQuery } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';

function App() {
	const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
	
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data?.authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={data?.authUser ? <Navigate to='/' /> : <LoginPage />} />
				<Route path='/signup' element={data?.authUser ? <Navigate to="/"/> : <SignUpPage />} />
				<Route path='/transaction/:id' element={data?.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;