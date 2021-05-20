import { Switch, Route, useHistory, BrowserRouter } from 'react-router-dom';
import './App.css';
import { SearchEngine } from './components/SearchEngine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SearchEngine} />
        </Switch>
        {/*<SearchEngine />*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
