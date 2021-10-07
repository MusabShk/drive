import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { AuthContext } from "../../../contexts/Auth";
import AddFileBtn from "./AddFileBtn";
import getFiles from "./functions/getFiles";
import getSpace from "./functions/getSpace";
import PageLoader from "../../../shared/PageLoader";
import GridView from "../../../shared/Grid/GridView";
import { globalStyles } from "../../../constants";
import NoDocs from "../../../shared/NoDocs";

function FileDetails({ route }) {
  // this shows files that are inside the current folder
  const { id } = route.params;
  const [pageLoading, setPageLoading] = useState(true);
  const [childFiles, setChildFiles] = useState([]);
  const [space, setSpace] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = getFiles(
      currentUser,
      id,
      setChildFiles,
      setPageLoading
    );

    const unsub = getSpace(setSpace);

    return () => {
      unsubscribe();
      unsub();
    };
  }, [currentUser, id, setChildFiles, setPageLoading]);

  return pageLoading ? (
    <PageLoader />
  ) : (
    <View style={globalStyles.container}>
      <AddFileBtn parentId={id} />

      <Button
        mode="contained"
        disabled
        uppercase={false}
        style={{ marginVertical: 10 }}
      >
        Remaining space: {space} MB
      </Button>

      {childFiles.length ? (
        <GridView documents={childFiles} type="file" userId={currentUser.uid} />
      ) : (
        <NoDocs text="files" />
      )}
    </View>
  );
}

export default FileDetails;
