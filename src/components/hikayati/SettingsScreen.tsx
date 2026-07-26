/**
 * شاشة الإعدادات — منقولة عن SettingsScreen.tsx في تصميم Lovable الأصلي.
 *
 * أهم عنصر هنا: عند تفعيل وضع الطفل، الشاشة كاملة تُستبدل بشاشة قفل مختلفة
 * تمامًا (SettingsLockedView) — لا تُظهر أي إعداد، فقط زر "اضغط مطوّلاً"
 * للعودة لوضع الوالدين. هذا يطابق تمامًا قفل التبويب نفسه في BottomTabs.
 *
 * ملاحظة تحويل: input[type=range] لحجم الخط بُني بـ @react-native-community/slider
 * (نفس المكتبة المستخدمة في SearchScreen لشريحة العمر).
 */
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import {
  Headphones,
  Type,
  Eye,
  Wifi,
  Globe,
  Info,
  Shield,
  ChevronLeft,
  Download,
  Trash2,
  HardDrive,
  Lock,
} from 'lucide-react-native';

import { Colors, Fonts } from '@/constants/theme';
import { stories } from './data';
import { useKidMode, HoldToUnlock } from './kid-mode';

export function SettingsScreen() {
  const [audioOnly, setAudioOnly] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [textSize, setTextSize] = useState(18);
  const { kidMode, setKidMode } = useKidMode();

  if (kidMode) {
    return <SettingsLockedView onUnlock={() => setKidMode(false)} />;
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>الإعدادات</Text>
      </View>

      <View style={styles.body}>
        <Group title="تجربة الاستماع">
          <Toggle
            icon={<Headphones size={16} color={Colors.light.emeraldDeep} />}
            label="وضع الصوت فقط"
            desc="إخفاء النصّ والتركيز على الاستماع"
            on={audioOnly}
            onToggle={() => setAudioOnly((v) => !v)}
          />
        </Group>

        <Group title="القراءة">
          <View style={styles.card}>
            <View style={styles.fontSizeTopRow}>
              <Type size={16} color={Colors.light.emeraldDeep} />
              <Text style={styles.fontSizeLabel}>حجم الخطّ</Text>
              <Text style={styles.fontSizeValue}>{textSize}px</Text>
            </View>
            <Slider
              value={textSize}
              onValueChange={setTextSize}
              minimumValue={14}
              maximumValue={26}
              step={1}
              minimumTrackTintColor={Colors.light.emeraldDeep}
              maximumTrackTintColor="rgba(6,78,59,0.15)"
              thumbTintColor={Colors.light.emeraldDeep}
              style={styles.slider}
            />
            <View style={styles.fontPreviewBox}>
              <Text style={[styles.fontPreviewText, { fontSize: textSize }]}>
                بسمِ اللهِ الرَّحمنِ الرَّحيم
              </Text>
            </View>
          </View>
          <Toggle
            icon={<Eye size={16} color={Colors.light.emeraldDeep} />}
            label="تباين عالٍ"
            desc="ألوان أوضح للقراءة الطويلة"
            on={contrast}
            onToggle={() => setContrast((v) => !v)}
          />
          <Toggle
            icon={<Type size={16} color={Colors.light.emeraldDeep} />}
            label="خطّ صديق لعُسر القراءة"
            desc="خطّ مصمّم لتسهيل القراءة"
            on={dyslexia}
            onToggle={() => setDyslexia((v) => !v)}
          />
        </Group>

        <Group title="التنزيلات">
          <Toggle
            icon={<Wifi size={16} color={Colors.light.emeraldDeep} />}
            label="التنزيل عبر الواي فاي فقط"
            desc="توفير باقة الإنترنت الخلوي"
            on={wifiOnly}
            onToggle={() => setWifiOnly((v) => !v)}
          />
          <DownloadsPanel />
        </Group>

        <Group title="عام">
          <Row icon={<Globe size={16} color={Colors.light.emeraldDeep} />} label="اللغة" value="العربية" />
          <Row icon={<Info size={16} color={Colors.light.emeraldDeep} />} label="حول التطبيق" value="١.٠.٠" />
          <Row icon={<Shield size={16} color={Colors.light.emeraldDeep} />} label="سياسة الخصوصية" />
        </Group>

        <Text style={styles.footerNote}>حِكايتي · محتوى مُراجَع لعائلات المسلمين</Text>
      </View>
    </ScrollView>
  );
}

function SettingsLockedView({ onUnlock }: { onUnlock: () => void }) {
  return (
    <View style={styles.lockedRoot}>
      <View style={styles.lockedIconBox}>
        <Lock size={28} color={Colors.light.gold} />
      </View>
      <Text style={styles.lockedTitle}>الإعدادات مقفلة</Text>
      <Text style={styles.lockedDesc}>
        وضع الطفل مُفعّل. الإعدادات المتقدّمة والتنزيلات متاحة لوليّ الأمر فقط.
      </Text>
      <View style={styles.lockedButtonWrap}>
        <HoldToUnlock label="اضغط مطوّلاً لفتح وضع الوالدين" doneLabel="تم الفتح" onComplete={onUnlock} />
      </View>
    </View>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.groupBody}>{children}</View>
    </View>
  );
}

function Toggle({
  icon,
  label,
  desc,
  on,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} style={styles.card}>
      <View style={styles.rowInner}>
        <View style={styles.iconBox}>{icon}</View>
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowLabel}>{label}</Text>
          <Text style={styles.rowDesc}>{desc}</Text>
        </View>
        <View
          style={[styles.toggleTrack, { backgroundColor: on ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.2)' }]}
        >
          <View style={[styles.toggleThumb, { alignSelf: on ? 'flex-end' : 'flex-start' }]} />
        </View>
      </View>
    </Pressable>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.rowInner}>
        <View style={styles.iconBox}>{icon}</View>
        <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        <ChevronLeft size={16} color={Colors.light.ink} opacity={0.4} />
      </View>
    </Pressable>
  );
}

function DownloadsPanel() {
  const downloaded = stories.filter((s) => s.downloaded);
  const totalMb = downloaded.reduce((sum, s) => sum + (s.sizeMb ?? 0), 0);
  const barWidth = `${Math.min(100, (totalMb / 100) * 100)}%` as ViewStyle['width'];

  return (
    <View style={styles.card}>
      <View style={styles.downloadsTopRow}>
        <View style={styles.iconBox}>
          <HardDrive size={16} color={Colors.light.emeraldDeep} />
        </View>
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowLabel}>القصص المحفوظة للاستخدام دون اتصال</Text>
          <Text style={styles.rowDesc}>
            {downloaded.length} قصص · {totalMb.toFixed(1)} م.ب
          </Text>
        </View>
        <View style={styles.storageBarTrack}>
          <View style={[styles.storageBarFill, { width: barWidth }]} />
        </View>
      </View>

      <View style={styles.downloadsList}>
        {downloaded.map((s) => (
          <View key={s.id} style={styles.downloadItem}>
            <Image source={{ uri: s.cover }} style={styles.downloadItemImage} contentFit="cover" />
            <View style={styles.downloadItemTextWrap}>
              <Text style={styles.downloadItemTitle} numberOfLines={1}>
                {s.titleAr}
              </Text>
              <View style={styles.downloadItemMetaRow}>
                <Text style={styles.downloadItemMetaText}>{s.minutes} د</Text>
                <Text style={styles.downloadItemMetaText}>·</Text>
                <Text style={styles.downloadItemMetaText}>{(s.sizeMb ?? 0).toFixed(1)} م.ب</Text>
              </View>
            </View>
            <Pressable style={styles.deleteButton}>
              <Trash2 size={14} color={Colors.light.emeraldDeep} />
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable style={styles.downloadMoreButton}>
        <Download size={13} color={Colors.light.goldSoft} />
        <Text style={styles.downloadMoreButtonText}>تنزيل قصص جديدة للقراءة دون اتصال</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.light.cream },
  scrollContent: { paddingBottom: 140 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 24, color: Colors.light.emeraldDeep, fontFamily: Fonts?.arabicSerif, textAlign: 'right' },
  body: { paddingHorizontal: 20, gap: 20 },
  group: {},
  groupTitle: {
    marginBottom: 8,
    paddingHorizontal: 4,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'rgba(26,42,36,0.6)',
    fontFamily: Fonts?.arabicSans,
    textAlign: 'right',
  },
  groupBody: { gap: 8 },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6,78,59,0.08)',
  },
  rowInner: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6,78,59,0.08)',
  },
  rowTextWrap: { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '700', color: Colors.light.emeraldDeep, fontFamily: Fonts?.arabicSans, textAlign: 'right' },
  rowDesc: { fontSize: 11, color: 'rgba(26,42,36,0.6)', fontFamily: Fonts?.arabicSans, textAlign: 'right' },
  rowValue: { fontSize: 12, color: 'rgba(26,42,36,0.6)', fontFamily: Fonts?.arabicSans },
  toggleTrack: { width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center' },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  fontSizeTopRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 8 },
  fontSizeLabel: { fontSize: 14, fontWeight: '700', color: Colors.light.emeraldDeep, fontFamily: Fonts?.arabicSans },
  fontSizeValue: { marginLeft: 'auto', fontSize: 12, color: 'rgba(26,42,36,0.6)', fontFamily: Fonts?.arabicSans },
  slider: { width: '100%', height: 32 },
  fontPreviewBox: { marginTop: 12, borderRadius: 12, padding: 12, backgroundColor: Colors.light.cream },
  fontPreviewText: {
    textAlign: 'center',
    lineHeight: 34,
    color: Colors.light.ink,
    fontFamily: Fonts?.arabicSerif,
  },
  footerNote: { paddingBottom: 8, textAlign: 'center', fontSize: 10, color: 'rgba(26,42,36,0.5)', fontFamily: Fonts?.arabicSans },

  lockedRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 140,
    backgroundColor: Colors.light.cream,
  },
  lockedIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.emeraldDeep,
  },
  lockedTitle: {
    marginTop: 16,
    fontSize: 24,
    color: Colors.light.emeraldDeep,
    fontFamily: Fonts?.arabicSerif,
    textAlign: 'center',
  },
  lockedDesc: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(26,42,36,0.6)',
    fontFamily: Fonts?.arabicSans,
  },
  lockedButtonWrap: { marginTop: 24, width: '100%' },

  downloadsTopRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, marginBottom: 12 },
  storageBarTrack: { width: 64, height: 6, borderRadius: 999, overflow: 'hidden', backgroundColor: 'rgba(6,78,59,0.12)' },
  storageBarFill: { height: '100%', borderRadius: 999, backgroundColor: Colors.light.gold },
  downloadsList: { gap: 8 },
  downloadItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 8,
    backgroundColor: Colors.light.cream,
  },
  downloadItemImage: { width: 44, height: 44, borderRadius: 8 },
  downloadItemTextWrap: { flex: 1 },
  downloadItemTitle: { fontSize: 13, fontWeight: '700', color: Colors.light.emeraldDeep, fontFamily: Fonts?.arabicSerif, textAlign: 'right' },
  downloadItemMetaRow: { marginTop: 2, flexDirection: 'row-reverse', gap: 6 },
  downloadItemMetaText: { fontSize: 10, color: 'rgba(26,42,36,0.6)', fontFamily: Fonts?.arabicSans },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6,78,59,0.06)',
  },
  downloadMoreButton: {
    marginTop: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: Colors.light.emeraldDeep,
  },
  downloadMoreButtonText: { fontSize: 12, fontWeight: '700', color: Colors.light.goldSoft, fontFamily: Fonts?.arabicSans },
});
