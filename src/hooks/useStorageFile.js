import "react-native-get-random-values";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage, timestamp } from "../../firebase/config";

import { AuthContext } from "../contexts/Auth";
import { remainingSpaceDocId } from "../constants";

const ONE_MB = 1000000;

function useStorageFile(
  document,
  documentName,
  documentSize,
  location,
  parentId
) {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const storageId = uuidv4();

    const storageRef = storage.ref(`${currentUser.uid}/${storageId}`);

    storageRef.put(document).on(
      "state_changed",
      (snap) => {
        // progress of the upload
        const percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => console.log(err),
      async () => {
        try {
          // getting the url from firebase storage
          const downloadUrl = await storageRef.getDownloadURL();

          // create a document in firestore
          await firestore.collection("files").add({
            name: documentName,
            ownerId: currentUser.uid,
            documentType: document.type,
            size: documentSize,
            url: downloadUrl,
            type: "file",
            createdAt: timestamp(),
            location,
            storageId,
            parentId,
          });

          const docRef = await firestore
            .collection("remainingSpace")
            .doc(remainingSpaceDocId);

          const doc = await docRef.get();
          const size = (documentSize / ONE_MB).toFixed(2);

          const existingSpace = doc.data().space;
          const newSpace = existingSpace - size;

          await docRef.set({
            space: newSpace,
          });

          setUrl(downloadUrl);
        } catch (err) {
          console.log(err);
        }
      }
    );
  }, [currentUser, document, documentName, parentId, setUrl, setProgress]);

  return { url, progress };
}

export default useStorageFile;
