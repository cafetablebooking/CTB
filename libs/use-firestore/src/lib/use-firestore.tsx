/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { firestore } from '@ctb/firebase-auth';

/* eslint-disable-next-line */
// export interface UseFirestoreProps {
//   collection: any;
// }

export function useFirestore(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      // .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}
