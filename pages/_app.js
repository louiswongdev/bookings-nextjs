import { Provider } from 'next-auth/client';

import '../styles/globals.css';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
