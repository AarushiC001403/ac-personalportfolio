import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
