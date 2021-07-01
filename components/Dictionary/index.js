import React, { memo, useCallback, useState, useEffect } from "react";
import {
  Layout,
  TopNavigation,
  Icon,
  ListItem,
  Text,
  Input,
  OverflowMenu,
  MenuItem,
  TopNavigationAction,
} from "@ui-kitten/components";

import { StyleSheet, Image, FlatList, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FLAGS, CONTINENT_ARR } from "../../lib";
import { DictionaryDetail } from "./Detail";
import useStore from "../../stores";
const { lang } = useStore();

const MenuIcon = (props) => <Icon {...props} name="options-2-outline" />;
const CheckIcon = (props) => <Icon {...props} name="checkmark-outline" />;
const arePropsEqual = () => {
  return true;
};

const RenderItem = memo(
  ({ item, onPress }) => (
    <ListItem
      onPress={onPress}
      key={item.index}
      title={item[`name_${lang.value}`]}
      description={lang.value === "kr" ? item.name_en : item.name_kr}
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
  const [currentMenu, setCurrentMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [value, setValue] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [data, setData] = useState(
    FLAGS.sort((a, b) => {
      const nameB = b.name_kr.toUpperCase();
      const nameA = a.name_kr.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    // FLAGS
  );

  useEffect(() => {
    const backAction = () => {
      if (!visible) {
        return false;
      } else {
        setVisible(false);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [visible]);

  const renderIcon = (props) => <Icon {...props} name={"search-outline"} />;

  const filterItems = (filterValue) => {
    const filterData =
      filterValue === "all"
        ? FLAGS
        : FLAGS.filter(
            (item) => item.continent.toLowerCase() === filterValue.toLowerCase()
          );
    setCurrentMenu(filterValue);
    toggleMenu();
    setData(filterData);
  };

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
          item.name_en.toLowerCase().includes(word) ||
          item.capital_kr.includes(word) ||
          item.capital_en.toLowerCase().includes(word)
      );
      setData(filterData);
    },
    [value]
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => {
    return (
      <>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
        >
          <MenuItem
            title="ALL"
            onPress={() => filterItems("all")}
            accessoryRight={currentMenu === "all" ? CheckIcon : null}
          />
          {CONTINENT_ARR.map((item, index) => (
            <MenuItem
              key={index}
              title={item}
              onPress={() => filterItems(item)}
              accessoryRight={currentMenu === item ? CheckIcon : null}
            />
          ))}
        </OverflowMenu>
      </>
    );
  };

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
        accessoryRight={renderRightActions}
      />
      <Input
        value={value}
        placeholder="Search Country or Capital"
        accessoryRight={renderIcon}
        onChangeText={(nextValue) => doSearch(nextValue)}
      />

      <FlatList
        showsHorizontalScrollIndicator={true}
        data={data}
        renderItem={({ item }) => (
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
