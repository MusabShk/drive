import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { globalStyles } from "../../../constants";
import { AuthContext } from "../../../contexts/Auth";
import AddFolderModal from "./AddFolderModal";
import getFolders from "./functions/getFolders";
import SearchBar from "../../../shared/SearchBar";
import PageLoader from "../../../shared/PageLoader";
import GridView from "../../../shared/Grid/GridView";
import NoDocs from "../../../shared/NoDocs";

function Folders({ navigation }) {
  // this shows folders inside the root folder
  // folder id of the Home/Root folder is null
  // so the first folder will have parentId = null
  const [folderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const handleNavigateToChat = () => {
    navigation.navigate("Chat");
  };

  useEffect(() => {
    // fetch folders in Home/Root
    const unsubscribe = getFolders(
      currentUser,
      folderId,
      setFolders,
      setPageLoading
    );

    return () => unsubscribe();
  }, [currentUser, folderId, setFolders, setPageLoading]);

  return pageLoading ? (
    <PageLoader />
  ) : (
    <View style={globalStyles.container}>
      <SearchBar />
      <AddFolderModal folderId={folderId} />

      {folders.length ? (
        <GridView documents={folders} type="folder" userId={currentUser.uid} />
      ) : (
        <NoDocs text="folders" />
      )}

      <Button
        onPress={handleNavigateToChat}
        style={{
          position: "absolute",
          bottom: 20,
          right: 10,
          borderRadius: 20,
          padding: 5,
          backgroundColor: "#fcf099",
        }}
      >
        <Text>Have a question?</Text>
      </Button>
    </View>
  );
}

export default Folders;
