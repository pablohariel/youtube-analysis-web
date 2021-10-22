import { BrowserRouter, Route, Switch  } from 'react-router-dom';

// import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={Home} /> */}
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }