import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { apiFetch } from "../lib/api";

const CITIES = [
  "Dortmund",
  "Essen",
  "Duisburg",
  "Bochum",
  "Gelsenkirchen",
  "Oberhausen",
  "Hagen",
  "Hamm",
  "Herne",
  "Muelheim",
  "Bottrop",
  "Recklinghausen",
  "Witten",
  "Castrop-Rauxel",
  "Luenen",
  "Marl",
  "Gladbeck",
  "Dinslaken",
  "Dorsten",
  "Herten",
];

interface ScanResult {
  newLeads: number;
  updatedLeads: number;
  totalFound: number;
}

export function ScanScreen() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleCity(city: string) {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  }

  function selectAll() {
    setSelectedCities(
      selectedCities.length === CITIES.length ? [] : [...CITIES]
    );
  }

  async function startScan() {
    if (selectedCities.length === 0) return;
    setScanning(true);
    setResult(null);
    setError(null);
    try {
      const res = await apiFetch<ScanResult>("/api/scan", {
        method: "POST",
        body: JSON.stringify({ cities: selectedCities }),
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan fehlgeschlagen");
    } finally {
      setScanning(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Staedte auswaehlen</Text>
      <TouchableOpacity onPress={selectAll} style={styles.selectAll}>
        <Text style={styles.selectAllText}>
          {selectedCities.length === CITIES.length
            ? "Alle abwaehlen"
            : "Alle auswaehlen"}
        </Text>
      </TouchableOpacity>
      <View style={styles.grid}>
        {CITIES.map((city) => {
          const selected = selectedCities.includes(city);
          return (
            <TouchableOpacity
              key={city}
              onPress={() => toggleCity(city)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={startScan}
        disabled={scanning || selectedCities.length === 0}
        style={[
          styles.scanBtn,
          (scanning || selectedCities.length === 0) && styles.scanBtnDisabled,
        ]}
      >
        {scanning ? (
          <ActivityIndicator size="small" color="#fafafa" />
        ) : (
          <Text style={styles.scanBtnText}>
            Scan starten ({selectedCities.length} Staedte)
          </Text>
        )}
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Scan abgeschlossen</Text>
          <Text style={styles.resultText}>
            Gefunden: {result.totalFound}
          </Text>
          <Text style={styles.resultText}>Neu: {result.newLeads}</Text>
          <Text style={styles.resultText}>
            Aktualisiert: {result.updatedLeads}
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b", padding: 16 },
  heading: {
    color: "#fafafa",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  selectAll: { marginBottom: 12 },
  selectAllText: { color: "#3b82f6", fontSize: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  chipSelected: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  chipText: { color: "#a1a1aa", fontSize: 13 },
  chipTextSelected: { color: "#fafafa", fontWeight: "600" },
  scanBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  scanBtnDisabled: { opacity: 0.5 },
  scanBtnText: { color: "#fafafa", fontSize: 16, fontWeight: "bold" },
  resultCard: {
    backgroundColor: "#18181b",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272a",
    marginBottom: 12,
  },
  resultTitle: {
    color: "#22c55e",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultText: { color: "#fafafa", fontSize: 14, marginBottom: 4 },
  errorCard: {
    backgroundColor: "#18181b",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  errorText: { color: "#ef4444", fontSize: 14 },
});
