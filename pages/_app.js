import App, { Container } from "next/app";
import { StoreProvider } from "easy-peasy";
import { OrbitContextProvider } from '../context/orbit-db';
import store from '../store'



class PolygoonApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <OrbitContextProvider>
          <StoreProvider store={store}>
            <Component {...pageProps} />
          </StoreProvider>
        </OrbitContextProvider>
      </Container>
    );
  }
}

export default PolygoonApp;