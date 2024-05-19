import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, CustomRadio, FormField } from "../../components";

import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    gender: "",
    tall: "",
    weight: "",
  });
  const submit = async () => {
    if (
      form.username === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirm === "" ||
      form.gender === "" ||
      form.tall === "" ||
      form.weight === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      if (form.password === form.confirm) {
        const result = await createUser(
          form.email,
          form.password,
          form.username,
          form.gender,
          form.tall,
          form.weight
        );
        setUser(result);
        setIsLogged(true);

        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to pedometer
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            value={form.confirm}
            handleChangeText={(e) => setForm({ ...form, confirm: e })}
            otherStyles="mt-7"
          />

          <CustomRadio
            title="Gender"
            options={[
              { label: "Female", value: "Female" },
              { label: "male", value: "male" },
            ]}
            checkedValue={form.gender}
            onChange={(value) => setForm({ ...form, gender: value })}
            style={{ marginBottom: 15 }}
          />
          <FormField
            title="Tall"
            value={form.tall}
            handleChangeText={(e) => setForm({ ...form, tall: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Weight"
            value={form.weight}
            handleChangeText={(e) => setForm({ ...form, weight: e })}
            otherStyles="mt-10"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
