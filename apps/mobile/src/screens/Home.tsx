import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useAccountData } from "../data/hooks/useAccountData";
import Balance from "../components/account/Balance";
import ErrorContainer from "../components/shared/ErrorContainer";
import Operations from "../components/account/Operations";

export default function Home({ navigation }: any) {
  const { account, loading, error } = useAccountData()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#340057" />
      </View>
    )
  }

  return account ? (
    <SafeAreaView style={styles.areaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.view}>
          <Balance account={account} />
          <Operations account={account} />
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <ErrorContainer error={error!} navigation={navigation} />
  )
}
const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F3f3f3",
  },
  scrollViewContent: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  view: {
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 30,
    paddingHorizontal: 15,
    height: "100%"
  }
});