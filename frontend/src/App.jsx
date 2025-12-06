import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from './pages/TodoPage';
import { todoStyles } from "./styles/todoStyles";

const App = () => {
    return (
        <Router>
            <nav className={todoStyles.navbar}>
                <div className={todoStyles.navbarInner}>
                    <Link
                        to="/"
                        className={todoStyles.navbarLink}
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