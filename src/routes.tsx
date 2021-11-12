import { BrowserRouter, Route, Switch  } from 'react-router-dom'

import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { CreateAnalysis } from './pages/CreateAnalysis'
import { Analysis } from './pages/Analysis'
import { Contact } from './pages/Contact'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={Profile} />
                <Route path="/analysis/create" component={CreateAnalysis} />
                <Route path="/analysis/:id" component={Analysis} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }