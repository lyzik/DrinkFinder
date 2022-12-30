import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DrinkDetails from './components/DrinkDetails/DrinkDetails'
import DrinksList from './components/DrinksList/DrinksList'
import Header from './components/Header/Header'
import SearchDrinksComponent from './components/SearchDrinksComponent/SearchDrinksComponent'

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='' element={<DrinksList />} />
          <Route path='/drinks/:id' element={<DrinkDetails />}/>
          <Route path='/search' element={<SearchDrinksComponent />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App