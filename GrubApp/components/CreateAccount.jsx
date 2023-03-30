import { View, Button, TextInput, StatusBar } from "react-native";
import { Formik } from "formik";

export const CreateAccount = () => {
  return (
    <View>
      <View>
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
            location: "",
            contact: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <TextInput
                value={values.username}
                placeholder="username"
                onChangeText={handleChange("username")}
              />
              <TextInput
                value={values.password}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={handleChange("password")}
              />
              <TextInput
                value={values.confirmPassword}
                secureTextEntry={true}
                placeholder="confirm password"
                onChangeText={handleChange("confirm password")}
              />
              <TextInput
                value={values.location}
                placeholder="location"
                onChangeText={handleChange("location")}
              />
              <TextInput
                value={values.contact}
                placeholder="contact"
                keyboardType="phone-pad"
                onChangeText={handleChange("contact")}
              />
              <Button title="submit" onPress={handleSubmit}></Button>
            </View>
          )}
          ;
        </Formik>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
