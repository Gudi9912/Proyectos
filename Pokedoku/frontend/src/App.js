
import './App.css';
import Menu  from "./components/Menu"
import Tabla from "./components/Tabla"

function App() {
  return (
    <div className='container'>
      {/* El menu estará presente en todos los componentes de nuestra aplicación */}
      <Menu />
      <div className='row'>
        <div className='col-12'>
        <Tabla></Tabla>
        </div>
      </div>
    </div>
  );
}

export default App;
