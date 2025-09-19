import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const MyPieChart = ({ data }) => {
  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth - 30}
        height={220}
        accessor={"value"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        chartConfig={{
          backgroundColor: "#1E2841",
          backgroundGradientFrom: "#1E2841",
          backgroundGradientTo: "#1E2841",
          color: () => "#FFF",
          labelColor: () => "#FFF",
        }}
        hasLegend={false} // usamos legenda customizada
        absolute
      />

      {/* Legenda customizada */}
      <View style={{ marginTop: 15 }}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            />
            <Text style={{ color: "#FFF", fontSize: 14 }}>
              {item.name}: R$ {item.value.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyPieChart;
