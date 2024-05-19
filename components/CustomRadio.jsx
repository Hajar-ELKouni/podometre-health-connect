import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomRadio = ({ title, options, checkedValue, onChange, style }) => {
  return (
    <View style={[styles.cont]}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View style={[styles.container, style]}>
        {options.map((option) => {
          let active = checkedValue == option.value;
          return (
            <TouchableOpacity style={styles.radio}>
              <MaterialIcons
                name={
                  active ? "radio-button-checked" : "radio-button-unchecked"
                }
                size={24}
                color={active ? "orange" : "#64748b"}
                onPress={() => {
                  onChange(option.value);
                }}
                key={option.value}
              />
              <Text style={styles.text}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    paddingTop: 20,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#161621",
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  radio: {
    height: 60,
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  activeRadio: {
    backgroundColor: "#06b6d4", // Set the color here
    opacity: 0.11, // Set the opacity here
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: "#6b7280",
  },
  activeText: {
    color: "#374151",
  },
});

export default CustomRadio;
