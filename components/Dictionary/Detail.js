import React, { memo } from "react";
import { Card, Modal, Icon, Button, Text } from "@ui-kitten/components";
import { CONTINENT_DETAIL_KR } from "../../lib";
import { Table, TableWrapper, Rows, Col } from "react-native-table-component";
import { StyleSheet, Image, Dimensions, View } from "react-native";

const screen = Dimensions.get("screen");
const imageWidth = screen.width > 400 ? 400 : screen.width - 100;
const imageHeight = imageWidth * 0.65;
const tableTitle = ["국가", "대륙", "수도"];
const CloseIcon = (props) => <Icon {...props} name="close" />;
const arePropsEqual = (prev, curr) => {
  return prev.visible === curr.visible;
};
const SpeakIcon = (props) => <Icon {...props} name="volume-up-outline" />;
const elementButton = (title, value) => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    }}
  >
    <Text style={{ paddingLeft: 8 }}>{title}</Text>
    <Text style={{ paddingLeft: 8 }}>{value}</Text>
  </View>
);

export const DictionaryDetail = memo(
  ({ visible, setVisible, modalItem: item }) => {
    const data = [
      [elementButton(item.name_kr, item.name_en)],
      [
        elementButton(
          CONTINENT_DETAIL_KR[item.continent_detail],
          item.continent_detail
        ),
      ],
      [elementButton(item.capital_kr, item.capital_en)],
    ];
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -80,
          }}
        >
          <Button
            status="control"
            appearance="ghost"
            size="giant"
            onPress={() => setVisible(false)}
            accessoryLeft={CloseIcon}
          />
        </View>
        <Card disabled={true} status="primary">
          <Image
            source={item.image}
            style={{
              width: imageWidth,
              height: imageHeight,
              resizeMode: "stretch",
              marginBottom: 20,
            }}
          />

          <Table borderStyle={{ borderWidth: 1, borderColor: "#666" }}>
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.title}
                textStyle={styles.headText}
              />
              <Rows
                data={data}
                flexArr={[2, 2]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </Card>
      </Modal>
    );
  },
  arePropsEqual
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  listItem: {
    marginVertical: 6,
  },
  head: { height: 40, backgroundColor: "#1A2242" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#1A2242" },
  row: { height: 60 },
  headText: {
    textAlign: "left",
    color: "white",
    paddingLeft: 13,
  },
  text: {
    textAlign: "left",
    color: "#fff",
  },
});
