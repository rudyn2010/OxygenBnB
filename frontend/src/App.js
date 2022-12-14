import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import SpotsShow from "./components/SpotsShow";
import SpotDetailsCard from "./components/SpotDetailCard";
import NewNavBar from "./components/NewNavBar";
import CurrentUserSpotsShow from "./components/CurrentUserSpotsShow";
import CurrentUserReviewsShow from "./components/CurrentUserRevShow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NewNavBar isLoaded={isLoaded} />
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SpotsShow />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetailsCard />
          </Route>
          <Route path="/your-listings" exact>
            <CurrentUserSpotsShow />
          </Route>
          <Route path="/your-reviews" exact>
            <CurrentUserReviewsShow />
          </Route>
          <Route>
            <Redirect to="/"/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
