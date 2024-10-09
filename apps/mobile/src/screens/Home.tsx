import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useAccountData } from "../data/hooks/useAccountData";
import Balance from "../components/account/Balance";
import ErrorContainer from "../components/shared/ErrorContainer";
import Operations from "../components/account/Operations";
import UserData from "../components/user/User";
import Header from "../components/shared/Header";

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
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
        <View style={styles.view}>
          <Header/>
          <UserData account={account} />
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
    backgroundColor: "#1f1b2e",
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView:{
    flexGrow: 1,
    width: "100%",
  },
  view: {
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 30,
  }
});