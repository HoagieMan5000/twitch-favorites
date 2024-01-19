import { FavoritesListContainer } from '@root/src/shared/components/content/favoritesList/FavoritesListContainer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <FavoritesListContainer />;
}
