import {Route, BrowserRouter as Router,} from 'react-router-dom'

import Schedule from './views/Schedule/Schedule'


function App() {
  return (
    <Router>
      <Route path="/" component={Schedule}/>
    </Router>
  );
}

export default App;
