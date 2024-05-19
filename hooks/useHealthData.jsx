import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

const useHealthData = (date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    async function requestHealthPermissions() {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BODY_SENSORS, // ou la permission spécifique aux données de santé dont vous avez besoin
            {
              title: "Permission de Données de Santé",
              message:
                "Cette application a besoin d'accéder à vos données de santé pour lire les enregistrements de pas.",
              buttonNeutral: "Demandez-moi plus tard",
              buttonNegative: "Annuler",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Vous pouvez accéder aux données de santé");
          } else {
            console.log("Permission de données de santé refusée");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    const readSampleData = async () => {
      // Initialize the Health Connect client
      const isInitialized = await initialize();

      if (!isInitialized) {
        console.log("Health Connect initialization failed");
        return;
      }

      // Request permissions
      const grantedPermissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "Distance" },
        { accessType: "read", recordType: "ActiveCaloriesBurned" },
      ]);

      if (!grantedPermissions) {
        console.log("Permissions not granted");
        Alert.alert(
          "Permissions Not Granted",
          "Please grant permissions to access health data.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
        return;
      }

      // Read data
      try {
        const stepsResult = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "after",
            startTime: "2024-05-18T12:00:00.405Z",
            //endTime: new Date(date).toISOString(),
          },
        });
        console.log(stepsResult);
        setSteps(stepsResult.reduce((acc, record) => acc + record.value, 0));

        const distanceResult = await readRecords("Distance", {
          timeRangeFilter: {
            operator: "after",
            startTime: new Date(date).toISOString(),
            endTime: new Date(date).toISOString(),
          },
        });
        setDistance(
          distanceResult.reduce((acc, record) => acc + record.value, 0)
        );

        const caloriesResult = await readRecords("ActiveCaloriesBurned", {
          timeRangeFilter: {
            operator: "after",
            startTime: new Date(date).toISOString(),
            endTime: new Date(date).toISOString(),
          },
        });
        setCalories(
          caloriesResult.reduce((acc, record) => acc + record.value, 0)
        );
      } catch (error) {
        console.log("Error reading records:", error);
      }
    };

    if (Platform.OS === "android") {
      requestHealthPermissions();
      readSampleData();
    }
  }, [date]);

  return {
    steps,
    distance,
    calories,
  };
};

export default useHealthData;
