import { firestore, storage } from "../../../../../firebase/config";

import { remainingSpaceDocId } from "../../../../constants";

const ONE_MB = 1000000;

const handleFileDelete = async (file, userId) => {
  try {
    if (file.ownerId === userId) {
      // delete from firestore
      await firestore.collection("files").doc(file.id).delete();

      const docRef = await firestore
        .collection("remainingSpace")
        .doc(remainingSpaceDocId);

      const doc = await docRef.get();
      const size = (file.size / ONE_MB).toFixed(2);

      const existingSpace = doc.data().space;
      const newSpace = Number(existingSpace) + Number(size);

      await docRef.set({
        space: newSpace,
      });

      // delete from storage
      await storage.ref(`${userId}/${file.storageId}`).delete();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handleFileDelete;
