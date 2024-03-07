import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes";
import BasicLayout from "../../layouts/BasicLayouts";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <Router>
      <BasicLayout>
        <Routes />
      </BasicLayout>
    </Router>
    </ChakraProvider>
  );
}

export default App;
