import React from "react";
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

import { getStage } from "./lib";

const items = getStage(1);
// navigation.push("Play", { items, stage });

const Stack = createStackNavigator();
export default () => (
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
          /> */}
          {/* <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerShown: false,
            }}
          /> */}
          {/* <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerShown: false,
            }}
          /> */}
          <Stack.Screen
            name="Play"
            component={Play}
            options={{
              headerShown: false,
            }}
            initialParams={{ items, stage: 1 }}
          />
          <Stack.Screen
            title="dd"
            name="Dictionary"
            component={Dictionary}
            initialParams={{ id: 42 }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
