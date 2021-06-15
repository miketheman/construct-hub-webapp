import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { Packages } from "./views/Packages";
import { SearchResults } from "./views/SearchResults";

export function App() {
  return (
    <Box bg="gray.50" className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/packages">
          <Packages />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Box>
  );
}
