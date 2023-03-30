import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";

export const ListItem = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [usePresentLocation, setUsePresentLocation] = useState(false);
  const [image, setImage] = useState(null);

  const changeQuantity = (text) => {
    const regEx = /[^0-9]/;
    if (!regEx.test(text)) {
      setQuantity(text);
    }
  };

  async function takePhoto() {
    let permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.status !== "granted") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    }
    if (permissionResult.status !== "granted") {
      alert("You must turn on camera permissions to record a video.");
    } else {
      ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [3, 4],
      }).then(({ assets }) => {
        setImage(assets[0]);
      });
    }
  }
  console.log(image);
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        expiry_date: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        console.log(usePresentLocation);
      }}
    >
      {({ setFieldValue, handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.pictureViewer} onPress={takePhoto}>
            {image ? (
              <Image style={styles.itemPicture} source={image} />
            ) : (
              <Text style={styles.pictureText}>Add Picture</Text>
            )}
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Item name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Item description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
          </View>
          <Text style={styles.itemLabel}>Expiry date:</Text>
          <Calendar
            onDayPress={(date) => {
              setFieldValue("expiry_date", date.dateString);
            }}
            minDate={new Date().toJSON().slice(0, 10)}
            markedDates={{ [values.expiry_date]: { selected: true } }}
            value={values.expiry_date}
          />
          <Text style={styles.itemLabel}>Quantity:</Text>
          <View style={styles.quantityView}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                setQuantity((current) => {
                  if (current > 1) {
                    return current - 1;
                  }
                  return current;
                })
              }
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.QuantityInput}
              keyboardType="number-pad"
              value={String(quantity)}
              onChangeText={changeQuantity}
            />

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity((current) => current + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.locationPicker}>
            <Text>Current location</Text>
            <Switch
              value={usePresentLocation}
              onChange={() => {
                setUsePresentLocation((value) => !value);
              }}
            />
            <Text>Home location</Text>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#94d2a9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },
  QuantityInput: {
    height: 50,
    marginHorizontal: 10,
    padding: 10,
    textAlign: "center",
  },
  quantityView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  quantityButton: {
    borderRadius: 40,
    backgroundColor: "#334bd6",
    width: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: "#334bd6",
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  locationPicker: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  itemLabel: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  pictureViewer: {
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    width: "50%",
    aspectRatio: 1,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#334bd6",
    alignItems: "center",
    justifyContent: "center",
  },
  pictureText: {
    color: "#334bd6",
  },
  itemPicture: {
    flex: 1,
    resizeMode: "contain",
  },
});
