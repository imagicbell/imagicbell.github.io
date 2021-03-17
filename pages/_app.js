import '@/styles/index.css';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return <Component {...pageProps} />
}
