import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home';
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import Detail from './components/Detail/Detail';
//Defino las rutas y que se va a renderizar en cada una

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route exact path='/recipe' component={RecipeCreate}/>
        <Route path="/recipes/:id" component={Detail}/> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
