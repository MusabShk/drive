import { firestore } from "../../../../../firebase/config";
import { remainingSpaceDocId } from "../../../../constants";

const getSpace = (setSpace) =>
  firestore
    .collection("remainingSpace")
    .doc(remainingSpaceDocId)
    .onSnapshot((snap) => setSpace(snap.data().space.toFixed(2)));

export default getSpace;
