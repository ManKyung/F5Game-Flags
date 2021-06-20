import React, { useEffect } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Button,
  IconRegistry,
} from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Play, Quiz, Dictionary } from "./components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as Analytics from "expo-firebase-analytics";
import uuid from "react-native-uuid";

import { soundInit, getStage } from "./lib";

const items = getStage(1);
const Stack = createStackNavigator();

export default () => {
  soundInit();
  const uid = uuid.v4();
  Analytics.setClientId(uid);
  useEffect(() => {
    (async () => {
      await Analytics.logEvent("app_view", {
        name: "app_start",
        screen: "APP",
        user: uid,
        purpose: "APP_START",
      });
    })();
  });
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Play"
              component={Play}
              options={{
                headerShown: false,
              }}
              initialParams={{ items, stage: 1 }}
            /> */}
            <Stack.Screen
              name="Dictionary"
              component={Dictionary}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
