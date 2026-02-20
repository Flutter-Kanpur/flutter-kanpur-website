/**
 * Client-side hook to convert Firebase storage paths to download URLs.
 * Same pattern used in profile edit page.
 * 
 * Usage:
 *   const photoURL = usePhotoURL('members/photo.jpg');
 *   <Avatar src={photoURL} />
 */

import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export function usePhotoURL(storagePath) {
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storagePath || storagePath.startsWith('http')) {
      // Already a URL or empty; use as-is
      setPhotoURL(storagePath || '');
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchURL = async () => {
      try {
        const storage = getStorage();
        const fileRef = ref(storage, storagePath);
        const url = await getDownloadURL(fileRef);
        if (isMounted) {
          setPhotoURL(url);
        }
      } catch (err) {
        console.warn(`Could not fetch URL for ${storagePath}:`, err.message);
        if (isMounted) {
          setError(err);
          setPhotoURL('');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchURL();

    return () => {
      isMounted = false;
    };
  }, [storagePath]);

  return photoURL;
}
