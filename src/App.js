import { Routes, Route ,Navigate} from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import './App.css';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
