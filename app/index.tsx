import SimpleTemplate from "@/ui/template/simple";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { bridgeStorage, WebViewScreen } from "wovvmap-webview-bridge";

export default function Index() {

  
  const [isMapLoaded] = bridgeStorage.signal("isMapLoaded")

 
  

  return (
   
    <SafeAreaView style={styles.root}>
        <WebViewScreen url="http://192.168.31.27:5173/879167591707213" />
        <Text>{String(isMapLoaded)}</Text>

      {isMapLoaded ?
        <>
          <SimpleTemplate />
          
        </>

        : null}

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  root: { flex: 1 },                 // ✅ no centering here
});