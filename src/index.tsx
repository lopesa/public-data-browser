import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Root from "./routes/Root.route";
import Home from "./routes/Home.route";
import Bookmarks from "./routes/Bookmarks.route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "routes/About.route";
import ReactGA from "react-ga4";
import { PersistGate } from "redux-persist/integration/react";

const TRACKING_ID = "G-BG9CD130J1";
ReactGA.initialize([{ trackingId: TRACKING_ID }]);

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
