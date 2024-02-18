import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes";
import BasicLayout from "../../layouts/BasicLayouts";

function App() {
  return (
    <Router>
      <BasicLayout>
        <Routes />
      </BasicLayout>
    </Router>
  );
}

export default App;
