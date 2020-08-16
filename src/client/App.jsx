import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { createBrowserHistory } from 'history'

import {
  BookList,
  BookDetail,
  NotFound,
} from './views'


const App = () => (
  <Router history={createBrowserHistory()}>
    <main>
      <Switch>
        <Route exact path="/">
          <Redirect to="/books" />
        </Route>
        <Route exact path="/books">
          <BookList />
        </Route>
        <Route path="/books/:id">
          <BookDetail />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
    <footer>
      Copyright © imkitae
    </footer>
  </Router>
)

export default App
