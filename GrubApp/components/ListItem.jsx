import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

export const ListItem = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [usePresentLocation, setUsePresentLocation] = useState(false);

  const changeQuantity = (text) => {
    const regEx = /[^0-9]/;
    if (!regEx.test(text)) {
      setQuantity(text);
    }
  };
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
        <View style={styles.container}>
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
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
