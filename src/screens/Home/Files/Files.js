import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { AuthContext } from "../../../contexts/Auth";
import { globalStyles } from "../../../constants";
import AddFileBtn from "./AddFileBtn";
import getFiles from "./functions/getFiles";
import getSpace from "./functions/getSpace";
import SearchBar from "../../../shared/SearchBar";
import PageLoader from "../../../shared/PageLoader";
import GridView from "../../../shared/Grid/GridView";
import NoDocs from "../../../shared/NoDocs";

function Files() {
  // this shows files that are inside the root folder, therefore parentId = null
  // since root folder's id = null

  const [parentId] = useState(null);
  const [files, setFiles] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [space, setSpace] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // fetch files in the Home/Root folder
    const unsubscribe = getFiles(
      currentUser,
      parentId,
      setFiles,
      setPageLoading
    );

    const unsub = getSpace(setSpace);

    return () => {
      unsubscribe();
      unsub();
    };
  }, [currentUser, parentId, setFiles, setPageLoading]);

  return pageLoading ? (
    <PageLoader />
  ) : (
    <View style={globalStyles.container}>
      <SearchBar />
      <AddFileBtn parentId={parentId} />

      <Button
        mode="contained"
        disabled
        uppercase={false}
        style={{ marginVertical: 10 }}
      >
        Remaining space: {space} MB
      </Button>

      {files.length ? (
        <GridView documents={files} type="file" userId={currentUser.uid} />
      ) : (
        <NoDocs text="files" />
      )}
    </View>
  );
}

export default Files;
