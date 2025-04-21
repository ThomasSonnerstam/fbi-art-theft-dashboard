import "./App.css";
import MostWantedList from "./pages/MostWantedList";
import { Title } from "@mantine/core";

function App() {
  return (
    <div className="App">
      <Title order={1}>FBI Most Wanted</Title>
      <MostWantedList />
    </div>
  );
}

export default App;
