import React, { memo } from "react";
import { Card, Modal, Icon, Button } from "@ui-kitten/components";
import { CONTINENT_DETAIL_KR } from "../../lib";
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
const CloseIcon = (props) => <Icon {...props} name="close" />;
const arePropsEqual = (prev, curr) => {
  return prev.visible === curr.visible;
};
export const DictionaryDetail = memo(
  ({ visible, setVisible, modalItem: item }) => {
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
        <Card status="primary">
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
          {/* <View
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
          </View> */}
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
