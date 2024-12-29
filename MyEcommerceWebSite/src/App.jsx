// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Link } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import ProductForm from './Pages/EntryPages/Product.jsx'
import ThemeForm from './Pages/EntryPages/Theme.jsx'
import CategoryForm from './Pages/EntryPages/CategoryForm.jsx'
// import ThemeForm from './Pages/EntryPages/Theme.jsx'
import SubCategoryForm from './Pages/EntryPages/SubCategoryForm.jsx'
import SubThemeForm from './Pages/EntryPages/SubThemeForm.jsx'
import ProductList from './Pages/ListPages/ProductList.jsx'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="ProductEntry" element={<ProductForm />} />
          <Route path="ThemeEntry" element={<ThemeForm />} />
          <Route path="CategoryEntry" element={<CategoryForm />} />
          <Route path="ProductList" element={<ProductList />} />
          <Route path="SubCategoryEntry" element={<SubCategoryForm />} />
          <Route path="SubThemeEntry" element={<SubThemeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
