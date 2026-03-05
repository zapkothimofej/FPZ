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
