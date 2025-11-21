import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from './pages/TodoPage';

const App = () => {
    return (
        <Router>
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
                <div className="max-w-4xl mx-auto flex justify-center py-4 px-6">
                    <Link
                        to="/"
                        className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-600 transition-transform duration-200 transform hover:scale-105"
                    >
                        Todo Page
                    </Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<TodoPage />} />
            </Routes>
        </Router>
    );

}

export default App;