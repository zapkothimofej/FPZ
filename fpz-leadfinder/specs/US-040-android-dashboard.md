# US-040: Android App — Dashboard Screen

## Datei: fpz-leadfinder-mobile/src/screens/DashboardScreen.tsx

```tsx
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { apiFetch } from "../lib/api";

interface DashboardData {
  stats: {
    total: { value: number; trend: number };
    newToday: { value: number; trend: number };
    contacted: { value: number; trend: number };
    won: { value: number; trend: number };
  };
  recentLeads: Array<{
    id: string;
    name: string;
    city: string;
    overallScore: number | null;
  }>;
}

function getScoreColor(score: number | null): string {
  if (score == null) return "#52525b";
  if (score <= 40) return "#ef4444";
  if (score <= 70) return "#eab308";
  return "#22c55e";
}

export function DashboardScreen({ navigation }: { navigation: unknown }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await apiFetch<DashboardData>("/api/dashboard");
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Laden");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function onRefresh() {
    setRefreshing(true);
    fetchData();
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Fehler: {error}</Text>
        <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
          <Text style={styles.retryText}>Erneut versuchen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) return null;

  const statCards = [
    { title: "Gesamt", value: data.stats.total.value, trend: data.stats.total.trend },
    { title: "Neue heute", value: data.stats.newToday.value, trend: data.stats.newToday.trend },
    { title: "Kontaktiert", value: data.stats.contacted.value, trend: data.stats.contacted.trend },
    { title: "Gewonnen", value: data.stats.won.value, trend: data.stats.won.trend },
  ];

  return (
    <FlatList
      style={styles.container}
      data={data.recentLeads}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
      }
      ListHeaderComponent={
        <View>
          <View style={styles.statsGrid}>
            {statCards.map((stat) => (
              <View key={stat.title} style={styles.statCard}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text
                  style={[
                    styles.statTrend,
                    { color: stat.trend > 0 ? "#22c55e" : stat.trend < 0 ? "#ef4444" : "#71717a" },
                  ]}
                >
                  {stat.trend > 0 ? "+" : ""}
                  {stat.trend} diese Woche
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Neueste Leads</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => (navigation as { navigate: (screen: string, params: { id: string }) => void }).navigate("LeadDetail", { id: item.id })}
          style={styles.leadRow}
        >
          <View
            style={[styles.dot, { backgroundColor: getScoreColor(item.overallScore) }]}
          />
          <View style={styles.leadInfo}>
            <Text style={styles.leadName}>{item.name}</Text>
            <Text style={styles.leadCity}>{item.city}</Text>
          </View>
          <Text style={[styles.score, { color: getScoreColor(item.overallScore) }]}>
            {item.overallScore ?? "—"}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>Keine Leads vorhanden.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  center: { flex: 1, backgroundColor: "#09090b", justifyContent: "center", alignItems: "center" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 16 },
  statCard: {
    flex: 1,
    minWidth: "45%" as unknown as number,
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  statTitle: { color: "#71717a", fontSize: 12 },
  statValue: { color: "#fafafa", fontSize: 28, fontWeight: "bold", marginTop: 4 },
  statTrend: { fontSize: 11, marginTop: 2 },
  sectionTitle: { color: "#fafafa", fontSize: 18, fontWeight: "bold", padding: 16, paddingBottom: 8 },
  leadRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  leadInfo: { flex: 1 },
  leadName: { color: "#fafafa", fontSize: 14, fontWeight: "500" },
  leadCity: { color: "#71717a", fontSize: 12 },
  score: { fontSize: 14, fontWeight: "bold" },
  empty: { color: "#71717a", textAlign: "center", padding: 32 },
  error: { color: "#ef4444", fontSize: 16, marginBottom: 12 },
  retryButton: { backgroundColor: "#3b82f6", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: "#fafafa", fontWeight: "bold" },
});
```
