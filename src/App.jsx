import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList.jsx";
import Footer from "./components/Footer.jsx";



function App() {
  /*  const [count, setCount] = useState(0) */
  return(
    <div style={{fontFamily: "Arial, sans-serif", margin: "20px"}}>
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
export default App
