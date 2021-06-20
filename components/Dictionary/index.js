import React, { memo, useCallback, useState } from "react";
import {
  Layout,
  TopNavigation,
  Icon,
  ListItem,
  Text,
  Input,
  Card,
  Button,
  Modal,
} from "@ui-kitten/components";

import { StyleSheet, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FLAGS } from "../../lib";
import { DictionaryDetail } from "./Detail";

const arePropsEqual = (prev, curr) => {
  // return prev.item.name_kr === curr.item.name_kr;
  return true;
};

const RenderItem = memo(
  ({ item, onPress }) => (
    <ListItem
      onPress={onPress}
      key={item.index}
      title={item.name_kr}
      description={item.name_en}
      accessoryLeft={() => (
        <Image
          source={item.image}
          style={{
            width: 50,
            height: 30,
            resizeMode: "stretch",
          }}
        />
      )}
    />
  ),
  arePropsEqual
);
export const Dictionary = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [data, setData] = useState(
    // FLAGS.sort((a, b) => {
    //   const nameB = b.name_kr.toUpperCase();
    //   const nameA = a.name_kr.toUpperCase();
    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // })
    FLAGS
  );

  const renderIcon = (props) => <Icon {...props} name={"search-outline"} />;

  const onPress = useCallback(
    (item) => {
      setVisible(true);
      setModalItem(item);
    },
    [visible]
  );

  const filter = useCallback(
    (word) => {
      word = word.toLowerCase();
      const filterData = FLAGS.filter(
        (item) =>
          item.name_kr.includes(word) ||
          item.name_en.toLowerCase().includes(word)
      );
      setData(filterData);
    },
    [value]
  );

  const doSearch = useCallback(
    (value) => {
      setValue(value);
      filter(value);
    },
    [value]
  );

  return (
    <Layout style={styles.container}>
      <StatusBar hidden={true} />
      <TopNavigation
        title={() => (
          <Text category="h5" style={styles.title}>
            DICTIONARY
          </Text>
        )}
      />
      <Input
        value={value}
        placeholder="Search Country"
        accessoryRight={renderIcon}
        onChangeText={(nextValue) => doSearch(nextValue)}
      />

      <FlatList
        showsHorizontalScrollIndicator={true}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem item={item} onPress={() => onPress(item)} />
        )}
        keyExtractor={(item) => item.index.toString()}
      />
      <DictionaryDetail
        visible={visible}
        setVisible={setVisible}
        modalItem={modalItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    marginTop: -4,
    letterSpacing: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
