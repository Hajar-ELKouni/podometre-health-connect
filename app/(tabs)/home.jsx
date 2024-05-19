import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import { Value, RingProgress } from "../../components";
import useAppwrite from "../../lib/useAppwrite";
import useHealthData from "../../hooks/useHealthData";

import {
  getAllPosts,
  getLatestPosts,
  getCurrentUser,
} from "../../lib/appwrite";
import { StyleSheet } from "react-native";

const Home = () => {
  // AppleHealthKit.initHealthKit();

  const currentDate = new Date();
  const { steps, distance, calories } = useHealthData(currentDate);
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { data: currentUser } = useAppwrite(getCurrentUser);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {currentUser.username}
            </Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={images.logo}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View>
        <RingProgress progress={0.5} strokeWidth={20} radius={120} />
        <View>
          <Text className="text-2xl font-psemibold text-white"></Text>
          <View style={styles.values}>
            <Value label="Steps" value={steps} />
            <Value label="Distance" value="0,0 Km" />
            <Value label="Calories" value="0Kcal" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },

  values: {
    flexDirection: "row",
    gap: 55,
    marginTop: 100,
    flexWrap: "wrap",
  },
});
