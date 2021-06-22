import React, { memo } from "react";
import { Text, Card, Modal } from "@ui-kitten/components";
import { CONTINENT_KR, CONTINENT_DETAIL_KR, CONTINENT_DETAIL } from "../../lib";
import GradientButton from "react-native-gradient-buttons";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { StyleSheet, Image, Dimensions, View } from "react-native";

const screen = Dimensions.get("screen");
const imageWidth = screen.width > 400 ? 400 : screen.width - 100;
const imageHeight = imageWidth * 0.65;
const tableHead = ["", "한국어", "English"];
const tableTitle = ["국가", "대륙", "수도"];

const arePropsEqual = (prev, curr) => {
  return prev.visible === curr.visible;
};
export const DictionaryDetail = memo(
  ({ visible, setVisible, modalItem: item }) => {
    console.log(item);
    const data = [
      [item.name_kr, item.name_en],
      [CONTINENT_DETAIL_KR[item.continent_detail], item.continent_detail],
      [item.capital_kr, item.capital_en],
    ];
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card status="primary">
          <Image
            source={item.image}
            style={{ width: imageWidth, height: imageHeight, marginBottom: 20 }}
          />

          <Table borderStyle={{ borderWidth: 1, borderColor: "#aaa" }}>
            <Row
              data={tableHead}
              flexArr={[1, 2, 2]}
              style={styles.head}
              textStyle={styles.headText}
            />
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
          {/* <Text style={[styles.listItem, { marginTop: 20 }]}>
            국가 : {item.name_kr} / {item.name_en}
          </Text>
          <Text style={styles.listItem}>
            대륙 : {CONTINENT_KR[item.continent]} /{" "}
            {CONTINENT_DETAIL_KR[item.continent_detail]}
          </Text>
          <Text style={[styles.listItem, { marginBottom: 20 }]}>
            수도 : {item.capital_kr} / {item.capital_en}
          </Text> */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <GradientButton
              style={{ marginRight: 0 }}
              deepBlue
              text="CLOSE"
              width="30%"
              height={40}
              impact
              impactStyle="Heavy"
              radius={10}
              textStyle={{ fontSize: 14 }}
              onPressAction={() => setVisible(false)}
            />
          </View>
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
  row: { height: 38 },
  headText: {
    paddingLeft: 8,
    textAlign: "left",
    color: "white",
  },
  text: {
    paddingLeft: 8,
    textAlign: "left",
    color: "#fff",
  },
});
