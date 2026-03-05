import { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { apiFetch } from "../lib/api";

interface Lead {
  id: string;
  name: string;
  city: string;
  category: string;
  status: string;
  overallScore: number | null;
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3b82f6",
  CONTACTED: "#eab308",
  OFFER: "#a855f7",
  WON: "#22c55e",
  LOST: "#ef4444",
  IRRELEVANT: "#71717a",
};

function getScoreColor(score: number | null): string {
  if (score == null) return "#52525b";
  if (score <= 40) return "#ef4444";
  if (score <= 70) return "#eab308";
  return "#22c55e";
}

export function LeadsListScreen({ navigation }: { navigation: unknown }) {
  const nav = navigation as { navigate: (screen: string, params: { id: string }) => void };
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchLeads = useCallback(
    async (p: number, query: string, append: boolean) => {
      try {
        const params = new URLSearchParams({
          page: String(p),
          pageSize: "20",
        });
        if (query.trim()) params.set("search", query.trim());
        const result = await apiFetch<LeadsResponse>(
          `/api/leads?${params.toString()}`
        );
        if (append) {
          setLeads((prev) => [...prev, ...result.leads]);
        } else {
          setLeads(result.leads);
        }
        setHasMore(result.leads.length === 20);
      } catch {
        // silent
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchLeads(1, search, false);
  }, [fetchLeads, search]);

  function onRefresh() {
    setRefreshing(true);
    setPage(1);
    fetchLeads(1, search, false);
  }

  function onEndReached() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchLeads(nextPage, search, true);
  }

  function onSearchChange(text: string) {
    setSearch(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setLoading(true);
      fetchLeads(1, text, false);
    }, 400);
  }

  if (loading && leads.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Suchen..."
          placeholderTextColor="#71717a"
          value={search}
          onChangeText={onSearchChange}
        />
      </View>
      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => nav.navigate("LeadDetail", { id: item.id })}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: getScoreColor(item.overallScore) },
              ]}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.city} · {item.category}
              </Text>
            </View>
            <View style={styles.right}>
              <Text
                style={[
                  styles.score,
                  { color: getScoreColor(item.overallScore) },
                ]}
              >
                {item.overallScore ?? "—"}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      (STATUS_COLORS[item.status] ?? "#71717a") + "33",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: STATUS_COLORS[item.status] ?? "#71717a" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              style={{ padding: 16 }}
              size="small"
              color="#3b82f6"
            />
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Leads gefunden.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  center: {
    flex: 1,
    backgroundColor: "#09090b",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: { padding: 12 },
  searchInput: {
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fafafa",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  name: { color: "#fafafa", fontSize: 14, fontWeight: "500" },
  meta: { color: "#71717a", fontSize: 12, marginTop: 2 },
  right: { alignItems: "flex-end" },
  score: { fontSize: 16, fontWeight: "bold" },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: { fontSize: 10, fontWeight: "600" },
  empty: { color: "#71717a", textAlign: "center", padding: 32 },
});
