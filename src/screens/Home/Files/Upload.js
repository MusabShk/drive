import React, { useEffect } from "react";
import { View } from "react-native";

import useStorageFile from "../../../hooks/useStorageFile";
import UploadProgress from "../../../shared/UploadProgress";

function Upload({
  document,
  documentName,
  documentSize,
  location,
  parentId,
  setStartUpload,
}) {
  const { url, progress } = useStorageFile(
    document,
    documentName,
    documentSize,
    location,
    parentId
  );

  useEffect(() => {
    if (url) {
      setStartUpload(false);
    }
  }, [url, setStartUpload]);

  return (
    <View>
      <UploadProgress progress={progress} />
    </View>
  );
}

export default Upload;
