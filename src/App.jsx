import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from './pages/TodoPage';

const App = () => {
    return (
        <Router>
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
                <div className="max-w-4xl mx-auto flex justify-center gap-6 py-3">
                    <Link
                        to="/"
                        className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
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