import { View, Button, TextInput, StatusBar } from "react-native";
import { Formik } from "formik";

export const CreateAccount = () => {
  return (
    <View>
      <View>
        <Formik
          initialValues={{ username: "", Address: "", password: "" }}
          onSubmit={(values) => {}}
        >
          {(props) => (
            <View>
              <TextInput
                placeholder="username"
                onChangeText={props.handleChange("username")}
              />
              <TextInput
                placeholder="address"
                onChangeText={props.handleChange("address")}
              />
              <TextInput
                placeholder="password"
                onChangeText={props.handleChange("password")}
              />
              <TextInput
                placeholder="confirm password"
                onChangeText={props.handleChange("confirm password")}
              />
              <Button title="submit" onPress={props.handleSubmit}></Button>
            </View>
          )}
        </Formik>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
