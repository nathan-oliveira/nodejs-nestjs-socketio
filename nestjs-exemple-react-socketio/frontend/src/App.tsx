import { Title } from "./components/Title";
import {
  Container,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import theme from "./theme";
import { Mapping } from "./components/Mapping";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Title>Iniciando com React</Title>
        <Mapping />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
