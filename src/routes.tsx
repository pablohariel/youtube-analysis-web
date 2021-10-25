import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }