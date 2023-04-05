import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Switch,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required!"),
  expiry_date: Yup.date().required("Expiration date is required"),
});

export const ListItem = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [postingItem, setPostingItem] = useState(false);
  const [usePresentLocation, setUsePresentLocation] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState("");
  const [image, setImage] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const { user } = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };

  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get("https://grub-group-project.onrender.com/api/categories", {
        headers,
      })
      .then(({ data }) => {
        setCategoryList(
          data.categories.map((category, index) => {
            return { key: index + 1, value: category.name };
          })
        );
        setLoadingCategories(false);
      })
      .catch(() => navigation.navigate("Login"));
  }, []);

  const changeQuantity = (text) => {
    const regEx = /[^0-9]/;
    if (!regEx.test(text)) {
      setQuantity(text);
    }
  };

  async function pickPhoto() {
    ImagePicker.getMediaLibraryPermissionsAsync()
      .then(({ granted }) => {
        if (!granted) {
          return ImagePicker.requestMediaLibraryPermissionsAsync();
        } else {
          return { granted };
        }
      })
      .then(({ granted }) => {
        if (!granted) {
          alert("Grub needs your permission before you can select a photo");
        } else {
          return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
          });
        }
      })
      .then(({ assets }) => {
        if (assets) {
          setImage(assets[0]);
        }
      });
  }

  async function takePhoto() {
    let permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (!permissionResult.granted) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    }
    if (permissionResult.status !== "granted") {
      alert("You must turn on camera permissions to record a video.");
    } else {
      ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [3, 4],
        base64: true,
      }).then(({ assets }) => {
        setImage(assets[0]);
      });
    }
  }

  const cloudinaryUpload = () => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhirydfr8/upload";
    const base64img = `data:image/jpg;base64,${image.base64}`;
    const data = {
      file: base64img,
      upload_preset: "pbxzcto6",
    };
    return axios
      .post(CLOUDINARY_URL, data)
      .then((response) => response.data.url);
  };

  const submitNewItem = (values) => {
    setPostingItem(true);
    const newItem = { ...values };
    newItem.quantity = quantity;
    newItem.category = categoryIndex;
    newItem.user = user.user.username;
    newItem.expiry_date = new Date(newItem.expiry_date);
    cloudinaryUpload().then((image_url) => {
      newItem.item_url = image_url;
      return axios
        .post("https://grub-group-project.onrender.com/api/items", newItem, {
          headers,
        })
        .then((response) => {
          setPostingItem(false);
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err)
          setPostingItem(false);
          navigation.navigate("Login");
        });
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        expiry_date: "",
      }}
      validationSchema={ItemSchema}
      onSubmit={submitNewItem}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={pickerVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.button]}
                  onPress={() => {
                    setPickerVisible(false);
                    takePhoto();
                  }}
                >
                  <Text style={styles.textStyle}>Camera</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.button]}
                  onPress={() => {
                    setPickerVisible(false);
                    pickPhoto();
                  }}
                >
                  <Text style={styles.textStyle}>Library</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.pictureViewer}
            disabled={postingItem}
            onPress={() => setPickerVisible(true)}
          >
            {image ? (
              <Image style={styles.itemPicture} source={image} />
            ) : (
              <Text style={styles.pictureText}>Add Picture</Text>
            )}
          </TouchableOpacity>
          <View style={errors.name ? styles.inputViewVal : styles.inputView}>
            <TextInput
              editable={!postingItem}
              selectTextOnFocus={!postingItem}
              style={styles.TextInput}
              placeholder="Item name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              editable={!postingItem}
              selectTextOnFocus={!postingItem}
              style={styles.TextInput}
              placeholder="Item description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
          </View>
          <SelectList
            setSelected={(val) => setCategoryIndex(val)}
            data={categoryList}
            save="value"
          />
          <Text
            style={
              errors.expiry_date ? styles.validationText : styles.itemLabel
            }
          >
            Expiry date:
          </Text>
          <Calendar
            onDayPress={(date) => {
              if (!postingItem) {
                setFieldValue("expiry_date", date.dateString);
              }
            }}
            minDate={new Date().toJSON().slice(0, 10)}
            markedDates={{
              [values.expiry_date]: { selected: true, endingDay: true },
            }}
            value={values.expiry_date}
          />
          <Text style={styles.itemLabel}>Quantity:</Text>
          <View style={styles.quantityView}>
            <TouchableOpacity
              style={styles.quantityButton}
              disabled={postingItem}
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
              editable={!postingItem}
              selectTextOnFocus={!postingItem}
              style={styles.QuantityInput}
              keyboardType="number-pad"
              value={String(quantity)}
              onChangeText={changeQuantity}
            />

            <TouchableOpacity
              style={styles.quantityButton}
              disabled={postingItem}
              onPress={() => setQuantity((current) => current + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.locationPicker}>
            <Text>Home location</Text>
            <Switch
              value={usePresentLocation}
              disabled={true}
              onChange={() => {
                setUsePresentLocation((value) => !value);
              }}
            />
            <Text>Current location</Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            disabled={postingItem}
            onPress={handleSubmit}
          >
            {postingItem ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#def9ef",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#ECC763",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
    borderColor: "#ECC763",
    borderStyle: "solid",
    borderWidth: 3,
  },
  inputViewVal: {
    backgroundColor: "#ECC763",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
    borderColor: "#d00",
    borderStyle: "solid",
    borderWidth: 3,
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
    backgroundColor: "#680A20",
    width: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: "#680A20",
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
    borderColor: "#680A20",
    alignItems: "center",
    justifyContent: "center",
  },
  pictureText: {
    color: "#680A20",
  },
  itemPicture: {
    flex: 1,
    resizeMode: "contain",
  },
  validationText: {
    color: "#d00",
    fontWeight: "bold",
  },
  selectorStyle: {
    width: "70%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
