import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "@/redux/store";
import React, { FC } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { AppProps } from "next/app";

const App: FC<AppProps> = ({ Component, pageProps, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
