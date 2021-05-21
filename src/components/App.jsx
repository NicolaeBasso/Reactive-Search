import { Switch, Route, BrowserRouter } from 'react-router-dom';
import '../styles/App.css';
import { SearchEngine } from './SearchEngine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SearchEngine} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
