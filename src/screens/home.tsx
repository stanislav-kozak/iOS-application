import { StyleSheet, Text, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinSaveKeeper</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '600' },
});
