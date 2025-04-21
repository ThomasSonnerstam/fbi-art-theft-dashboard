import "./App.css";
import MostWantedList from "./pages/MostWantedList";
import { Stack, Title } from "@mantine/core";

function App() {
  return (
    <Stack className="App" style={{ paddingBottom: "50px" }}>
      <Title order={1}>FBI Most Wanted</Title>
      <MostWantedList />
    </Stack>
  );
}

export default App;
