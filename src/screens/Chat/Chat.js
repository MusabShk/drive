import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { TextInput, Card, Text, Button } from "react-native-paper";
import { colors } from "../../constants";

const DUMMY_ANSWERS = {
  hi: "Hello there!",
  1: "Click on the add folder button and type a name",
  2: "Click on the add file button and select a file",
  3: "Click on the 3 dots provided after the folder name. Select Delete folder option to delete it.",
  4: "Click on the 3 dots provided after the folder name. Select Rename option. Now you can type in a new name for your folder",
  5: "Click on the 3 dots provided after the file name. Select the Delete option to delete the file",
  6: "You can use the search bar to find your folders and files",
  7: "You can select the profile icon at the top right corner of the screen. There you will find an option to change your profile picture",
};

const DUMMY_QUESTIONS = {
  1: "How to create a folder?",
  2: "How to upload a file?",
  3: "How to delete a folder?",
  4: "How to rename a folder?",
  5: "How to delete a file?",
  6: "how do i find my files and folders on my drive?",
  7: "How can i change my profile picture?",
};

function Chat() {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleChatQuestion = () => {
    if (!input.trim()) {
      return;
    }

    setQuestions((prevQ) => {
      const temp = [...prevQ];
      temp.push(input);
      return temp;
    });

    switch (input.toLowerCase().trim()) {
      case "hi":
      case "hello":
      case "hey":
        setAnswers((prevA) => {
          const temp = [...prevA];
          temp.push(DUMMY_ANSWERS["hi"]);
          return temp;
        });
        break;

      default:
        setAnswers((prevA) => {
          const temp = [...prevA];
          temp.push("Could not understand your question. Please try again.");
          return temp;
        });
    }

    setInput("");
  };

  const handlePress = (id) => {
    setQuestions((prevQ) => {
      const temp = [...prevQ];
      temp.push(DUMMY_QUESTIONS[id]);
      return temp;
    });

    setAnswers((prevA) => {
      const temp = [...prevA];
      temp.push(DUMMY_ANSWERS[id]);
      return temp;
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView horizontal>
          <View
            style={{
              paddingBottom: 5,
              backgroundColor: colors.primary,
              flexDirection: "row",
            }}
          >
            <Button
              onPress={() => handlePress(1)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How to create a folder?</Text>
            </Button>

            <Button
              onPress={() => handlePress(3)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How to delete a folder?</Text>
            </Button>

            <Button
              onPress={() => handlePress(2)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How to upload a file?</Text>
            </Button>

            <Button
              onPress={() => handlePress(4)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How to rename a folder?</Text>
            </Button>

            <Button
              onPress={() => handlePress(5)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How to delete a file?</Text>
            </Button>

            <Button
              onPress={() => handlePress(6)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>how do i find my files and folders on my drive?</Text>
            </Button>

            <Button
              onPress={() => handlePress(7)}
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#fcf099",
              }}
            >
              <Text>How can i change my profile picture?</Text>
            </Button>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 8 }}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            {questions.map((temp, index) => (
              <View key={index}>
                <Card
                  style={{
                    width: "50%",
                    alignSelf: "flex-end",
                    padding: 10,
                    marginVertical: 20,
                    borderRadius: 10,
                    backgroundColor: "black",
                  }}
                >
                  <Text style={{ color: "#fff" }}>{questions[index]}</Text>
                </Card>

                <Card
                  style={{
                    width: "50%",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Text>{answers[index]}</Text>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={{ position: "absolute", bottom: 10, right: 0, left: 0 }}
          mode="outlined"
          label="Ask me..."
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleChatQuestion}
        />
      </View>
    </>
  );
}

export default Chat;
