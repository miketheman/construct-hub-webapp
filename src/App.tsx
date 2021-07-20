import { Grid } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ROUTES } from "./constants/url";
import * as shortbread from "./lib/shortbread";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { Packages } from "./views/Packages";
import { SearchResults } from "./views/SearchResults";

shortbread
  .initialize()
  .then(shortbread.checkForCookieConsent, (err) => console.error(err));

export const App: FunctionComponent = () => {
  return (
    <Grid
      as="main"
      bg="gray.50"
      gridTemplateColumns="1fr"
      gridTemplateRows="auto 1fr auto"
      h="100%"
      inset={0}
      maxW="100vw"
      overflow="hidden auto"
      position="fixed"
    >
      <Header />
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route path={ROUTES.PACKAGES}>
          <Packages />
        </Route>
        <Route exact path={ROUTES.SEARCH}>
          <SearchResults />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Grid>
  );
};
