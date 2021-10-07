import React, { useState } from "react";
import { View } from "react-native";
import { Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import Upload from "./Upload";
import { colors, globalStyles } from "../../../constants";
import handleGetLocation from "./functions/handleGetLocation";

function AddFileBtn({ parentId }) {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [documentSize, setDocumentSize] = useState(null);
  const [startUpload, setStartUpload] = useState(false);
  const [location, setLocation] = useState(null);

  const handleFileSelect = async () => {
    const loc = await handleGetLocation();
    setLocation(loc);
    const result = await DocumentPicker.getDocumentAsync();

    if (result.type !== "cancel") {
      const response = await fetch(result.uri);
      const file = await response.blob();

      setDocumentName(result.name);
      setDocumentSize(result.size);
      setDocument(file);
      setStartUpload(true);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Surface style={globalStyles.fab}>
        <MaterialCommunityIcons
          name="file-plus"
          size={50}
          color={colors.primary}
          onPress={handleFileSelect}
        />
      </Surface>

      {startUpload && (
        <Upload
          document={document}
          documentSize={documentSize}
          documentName={documentName}
          location={location}
          parentId={parentId}
          setStartUpload={setStartUpload}
        />
      )}
    </View>
  );
}

export default AddFileBtn;
