# US-042: Android App — Scan & Settings Screens

## Datei: fpz-leadfinder-mobile/src/screens/ScanScreen.tsx

```tsx
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
```

## Datei: fpz-leadfinder-mobile/src/screens/SettingsScreen.tsx

```tsx
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fpz-settings";

interface AppSettings {
  apiUrl: string;
  groqApiKey: string;
  hfApiKey: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  apiUrl: "http://localhost:3000",
  groqApiKey: "",
  hfApiKey: "",
};

export function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            setSettings({ ...DEFAULT_SETTINGS, ...(parsed as Partial<AppSettings>) });
          }
        } catch {
          // ignore
        }
      }
    });
  }, []);

  async function save() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      Alert.alert("Fehler", "Einstellungen konnten nicht gespeichert werden.");
    }
  }

  function update(key: keyof AppSettings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>API Verbindung</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Server URL</Text>
        <TextInput
          style={styles.input}
          value={settings.apiUrl}
          onChangeText={(v) => update("apiUrl", v)}
          placeholder="http://localhost:3000"
          placeholderTextColor="#52525b"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.heading}>API Keys</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Groq API Key</Text>
        <TextInput
          style={styles.input}
          value={settings.groqApiKey}
          onChangeText={(v) => update("groqApiKey", v)}
          placeholder="gsk_..."
          placeholderTextColor="#52525b"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>HuggingFace API Key</Text>
        <TextInput
          style={styles.input}
          value={settings.hfApiKey}
          onChangeText={(v) => update("hfApiKey", v)}
          placeholder="hf_..."
          placeholderTextColor="#52525b"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity onPress={save} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>
          {saved ? "Gespeichert!" : "Speichern"}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>FPZ LeadFinder</Text>
        <Text style={styles.infoText}>Version 1.0.0</Text>
        <Text style={styles.infoText}>FPC-Media, Bochum</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b", padding: 16 },
  heading: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
  },
  field: { marginBottom: 12 },
  label: { color: "#a1a1aa", fontSize: 12, marginBottom: 4 },
  input: {
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fafafa",
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: { color: "#fafafa", fontSize: 16, fontWeight: "bold" },
  infoCard: {
    backgroundColor: "#18181b",
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  infoTitle: { color: "#fafafa", fontSize: 16, fontWeight: "bold" },
  infoText: { color: "#71717a", fontSize: 13, marginTop: 4 },
});
```

## Zusaetzliche Abhaengigkeit installieren

```bash
npx expo install @react-native-async-storage/async-storage
```
