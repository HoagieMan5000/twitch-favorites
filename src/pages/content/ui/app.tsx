import { useEffect } from 'react';

export default function App(props: { param: string }) {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <div className="">content view {props.param}</div>;
}
