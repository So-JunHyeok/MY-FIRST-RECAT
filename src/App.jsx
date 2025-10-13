import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainArea from "./components/MainArea.jsx";

function App() {
  /*  const [count, setCount] = useState(0) */
  return(    
    <div className="app-container">
      <Sidebar />
      <MainArea />
    </div>
    /*
    <div style={{fontFamily: "Arial, sans-serif", margin: "20px"}}>
      <Sidebar />
    </div>
    */
  );
}
export default App
