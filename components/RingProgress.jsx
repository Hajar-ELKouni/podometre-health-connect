import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RingProgress = ({ radius = 100, strokeWidth = 20, progress }) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const fill = useSharedValue(0);
  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);
  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));
  const circleDefaultProps = {
    r: innerRadius,
    strokeWidth: strokeWidth,
    stroke: "orange",
    strokeLinecap: "round",
    originX: radius,
    originY: radius,
    cx: radius,
    cy: radius,
    rotation: "-90",
  };
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        {/*Background */}
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          strokeWidth={strokeWidth}
          stroke={"orange"}
          opacity={0.2}
        />
        {/*Foreground */}
        <AnimatedCircle animatedProps={animatedProps} {...circleDefaultProps} />
      </Svg>
      <AntDesign name="arrowright" size={24} color="black" style={{position:'absolute', alignSelf:'center',top :2}} />
    </View>
  );
};

export default RingProgress;
