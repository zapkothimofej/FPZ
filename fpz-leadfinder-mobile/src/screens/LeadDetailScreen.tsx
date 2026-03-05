import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import { apiFetch } from "../lib/api";

interface LeadDetail {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  category: string;
  status: string;
  overallScore: number | null;
  notes: string | null;
  analysis: {
    performanceScore: number | null;
    seoScore: number | null;
    mobileScore: number | null;
    securityScore: number | null;
    designScore: number | null;
    techScore: number | null;
    ageScore: number | null;
    accessibilityScore: number | null;
    contentScore: number | null;
  } | null;
  briefing: {
    weaknesses: string;
    suggestions: string;
    opener: string;
    riskLevel: string;
  } | null;
  script: {
    greeting: string;
    hook: string;
    painPoints: string;
    solution: string;
    callToAction: string;
    objections: string;
  } | null;
}

const STATUSES = ["NEW", "CONTACTED", "OFFER", "WON", "LOST", "IRRELEVANT"];

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

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  return (
    <View style={styles.scoreRow}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${score ?? 0}%` as unknown as number,
              backgroundColor: getScoreColor(score),
            },
          ]}
        />
      </View>
      <Text style={[styles.scoreValue, { color: getScoreColor(score) }]}>
        {score ?? "—"}
      </Text>
    </View>
  );
}

export function LeadDetailScreen({ route }: { route: unknown }) {
  const { id } = (route as { params: { id: string } }).params;
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"info" | "scores" | "briefing" | "script">(
    "info"
  );

  const fetchLead = useCallback(async () => {
    try {
      const result = await apiFetch<LeadDetail>(`/api/leads/${id}`);
      setLead(result);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  async function changeStatus(status: string) {
    if (!lead) return;
    try {
      await apiFetch(`/api/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setLead({ ...lead, status });
    } catch {
      // silent
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!lead) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Lead nicht gefunden</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{lead.name}</Text>
        <Text style={styles.subtitle}>
          {lead.address}, {lead.zip ? `${lead.zip} ` : ""}
          {lead.city}
        </Text>
        <Text style={styles.category}>{lead.category}</Text>
        <View style={styles.overallRow}>
          <Text
            style={[
              styles.overallScore,
              { color: getScoreColor(lead.overallScore) },
            ]}
          >
            {lead.overallScore ?? "—"}
          </Text>
          <Text style={styles.overallLabel}>/ 100</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        {STATUSES.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => changeStatus(s)}
            style={[
              styles.statusChip,
              {
                backgroundColor:
                  lead.status === s
                    ? STATUS_COLORS[s] ?? "#71717a"
                    : "#27272a",
              },
            ]}
          >
            <Text
              style={[
                styles.statusChipText,
                { color: lead.status === s ? "#fafafa" : "#a1a1aa" },
              ]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contactRow}>
        {lead.phone ? (
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL(`tel:${lead.phone}`)}
          >
            <Text style={styles.contactBtnText}>Anrufen</Text>
          </TouchableOpacity>
        ) : null}
        {lead.email ? (
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL(`mailto:${lead.email}`)}
          >
            <Text style={styles.contactBtnText}>Email</Text>
          </TouchableOpacity>
        ) : null}
        {lead.website ? (
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL(lead.website!)}
          >
            <Text style={styles.contactBtnText}>Website</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.tabs}>
        {(["info", "scores", "briefing", "script"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, tab === t && styles.tabTextActive]}
            >
              {t === "info"
                ? "Info"
                : t === "scores"
                  ? "Scores"
                  : t === "briefing"
                    ? "Briefing"
                    : "Skript"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "info" && (
        <View style={styles.section}>
          {lead.notes ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Notizen</Text>
              <Text style={styles.cardText}>{lead.notes}</Text>
            </View>
          ) : null}
        </View>
      )}

      {tab === "scores" && lead.analysis && (
        <View style={styles.section}>
          <ScoreBar label="Performance" score={lead.analysis.performanceScore} />
          <ScoreBar label="SEO" score={lead.analysis.seoScore} />
          <ScoreBar label="Mobile" score={lead.analysis.mobileScore} />
          <ScoreBar label="Sicherheit" score={lead.analysis.securityScore} />
          <ScoreBar label="Design" score={lead.analysis.designScore} />
          <ScoreBar label="Technik" score={lead.analysis.techScore} />
          <ScoreBar label="Alter" score={lead.analysis.ageScore} />
          <ScoreBar label="Barrierefreiheit" score={lead.analysis.accessibilityScore} />
          <ScoreBar label="Inhalt" score={lead.analysis.contentScore} />
        </View>
      )}

      {tab === "briefing" && lead.briefing && (
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Opener</Text>
            <Text style={styles.cardText}>{lead.briefing.opener}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Schwaechen</Text>
            <Text style={styles.cardText}>{lead.briefing.weaknesses}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vorschlaege</Text>
            <Text style={styles.cardText}>{lead.briefing.suggestions}</Text>
          </View>
        </View>
      )}

      {tab === "script" && lead.script && (
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Begruessung</Text>
            <Text style={styles.cardText}>{lead.script.greeting}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hook</Text>
            <Text style={styles.cardText}>{lead.script.hook}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pain Points</Text>
            <Text style={styles.cardText}>{lead.script.painPoints}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Loesung</Text>
            <Text style={styles.cardText}>{lead.script.solution}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Call to Action</Text>
            <Text style={styles.cardText}>{lead.script.callToAction}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Einwaende</Text>
            <Text style={styles.cardText}>{lead.script.objections}</Text>
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
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
  errorText: { color: "#ef4444", fontSize: 16 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#27272a" },
  title: { color: "#fafafa", fontSize: 22, fontWeight: "bold" },
  subtitle: { color: "#a1a1aa", fontSize: 14, marginTop: 4 },
  category: {
    color: "#3b82f6",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  overallRow: { flexDirection: "row", alignItems: "baseline", marginTop: 12 },
  overallScore: { fontSize: 36, fontWeight: "bold" },
  overallLabel: { color: "#71717a", fontSize: 16, marginLeft: 4 },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    padding: 12,
    paddingHorizontal: 16,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusChipText: { fontSize: 11, fontWeight: "600" },
  contactRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  contactBtn: {
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  contactBtnText: { color: "#3b82f6", fontSize: 13, fontWeight: "600" },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#3b82f6" },
  tabText: { color: "#71717a", fontSize: 13 },
  tabTextActive: { color: "#3b82f6", fontWeight: "600" },
  section: { padding: 16 },
  card: {
    backgroundColor: "#18181b",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  cardTitle: {
    color: "#a1a1aa",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardText: { color: "#fafafa", fontSize: 14, lineHeight: 20 },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreLabel: { color: "#a1a1aa", fontSize: 12, width: 100 },
  barBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#27272a",
    borderRadius: 3,
    marginHorizontal: 8,
  },
  barFill: { height: 6, borderRadius: 3 },
  scoreValue: { fontSize: 12, fontWeight: "bold", width: 30, textAlign: "right" },
});
