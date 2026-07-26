/**
 * شاشة الترحيب (Onboarding) — منقولة عن OnboardingScreen.tsx في تصميم Lovable.
 * أربع خطوات: اللغة، اسم/جنس الطفل، العمر، المواضيع المفضّلة.
 * تدعم تبديل الاتجاه (RTL/LTR) بالكامل حسب اللغة المختارة في الخطوة الأولى،
 * لأن هذه الشاشة الوحيدة التي يختار فيها المستخدم لغة الواجهة بنفسه.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Languages, Check, User } from 'lucide-react-native';

import { Colors, Fonts } from '@/constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Lang = 'ar' | 'en';

const themeOptions = [
  { ar: 'الأنبياء', en: 'Prophets' },
  { ar: 'الصحابة', en: 'Companions' },
  { ar: 'الأخلاق', en: 'Manners' },
  { ar: 'الأحاديث', en: 'Hadith' },
  { ar: 'الأدعية', en: 'Duas' },
  { ar: 'قصص القرآن', en: 'Quran stories' },
];

const t = {
  ar: {
    skip: 'تخطّي',
    next: 'التالي',
    start: 'ابدأ الاستماع',
    welcome: 'مرحبًا بكم في حِكايتي',
    welcomeSub: 'قصصٌ وأحاديثُ مختارةٌ بعنايةٍ لعائلتك. اختر لغةَ الواجهة للبدء.',
    kidTitle: 'من سيستمع؟',
    kidSub: 'الاسم اختياري، ويظهر في التحية داخل التطبيق.',
    nameLabel: 'اسم الطفل (اختياري)',
    namePlaceholder: 'مثال: يوسف',
    genderLabel: 'الجنس',
    boy: 'ولد',
    girl: 'بنت',
    ageTitle: 'كم عمرُ طفلك؟',
    ageSub: 'لنقدّم محتوى مناسبًا لعمره.',
    years: 'سنوات',
    themesTitle: 'ما المواضيع المفضّلة؟',
    themesSub: 'يمكنك اختيار أكثر من موضوع.',
  },
  en: {
    skip: 'Skip',
    next: 'Next',
    start: 'Start listening',
    welcome: 'Welcome to Hikayati',
    welcomeSub:
      'Carefully reviewed stories and hadith for your family. Choose your interface language to begin.',
    kidTitle: "Who's listening?",
    kidSub: 'The name is optional and only shows in the in-app greeting.',
    nameLabel: "Child's name (optional)",
    namePlaceholder: 'e.g. Yusuf',
    genderLabel: 'Gender',
    boy: 'Boy',
    girl: 'Girl',
    ageTitle: 'How old is your child?',
    ageSub: 'So we can suggest age-appropriate content.',
    years: 'years',
    themesTitle: 'Favourite themes?',
    themesSub: 'You can pick more than one.',
  },
} as const;

export type OnboardingResult = {
  lang: Lang;
  name: string;
  gender: 'boy' | 'girl';
  age: string | null;
  picks: string[];
};

export function OnboardingScreen({ onDone }: { onDone: (result: OnboardingResult) => void }) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Lang>('ar');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [name, setName] = useState('');
  const [age, setAge] = useState<string | null>('6-8');
  const [picks, setPicks] = useState<string[]>(['الأنبياء', 'الأخلاق']);

  const s = t[lang];
  const rtl = lang === 'ar';
  const steps = [0, 1, 2, 3];
  const BackIcon = rtl ? ChevronLeft : ChevronRight;
  const arabicFont = Fonts?.arabicSans;
  const arabicSerif = Fonts?.arabicSerif;
  const latinFont = Fonts?.sans;
  const latinSerif = Fonts?.serif;

  const goToStep = (next: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(next);
  };

  const toggle = (id: string) =>
    setPicks((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const handleFinish = () => {
    onDone({ lang, name, gender, age, picks });
  };

  return (
    <LinearGradient colors={[Colors.light.cream, Colors.light.creamDeep]} style={styles.container}>
      {/* الرأس: زر رجوع، نقاط التقدّم، تخطّي */}
      <View style={[styles.header, rtl && styles.rowReverse]}>
        <Pressable
          onPress={() => step > 0 && goToStep(step - 1)}
          disabled={step === 0}
          style={[styles.backButton, step === 0 && { opacity: 0.3 }]}
        >
          <BackIcon size={18} color={Colors.light.emeraldDeep} />
        </Pressable>

        <View style={[styles.dots, rtl && styles.rowReverse]}>
          {steps.map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: i === step ? 22 : 8,
                  backgroundColor:
                    i <= step ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.2)',
                },
              ]}
            />
          ))}
        </View>

        <Pressable onPress={handleFinish}>
          <Text style={[styles.skipText, { fontFamily: rtl ? arabicFont : latinFont }]}>
            {s.skip}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* الخطوة 0: اللغة */}
        {step === 0 && (
          <View>
            <View style={styles.iconBox}>
              <Languages size={26} color={Colors.light.gold} />
            </View>
            <Text
              style={[
                styles.title,
                { fontFamily: rtl ? arabicSerif : latinSerif, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.welcome}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.welcomeSub}
            </Text>

            <View style={styles.optionList}>
              {(
                [
                  { id: 'ar', title: 'العربية', sub: 'اللغة الأساسية' },
                  { id: 'en', title: 'English', sub: 'Interface language' },
                ] as const
              ).map((o) => {
                const active = lang === o.id;
                return (
                  <Pressable
                    key={o.id}
                    onPress={() => setLang(o.id)}
                    style={[
                      styles.langOption,
                      rtl && styles.rowReverse,
                      {
                        borderColor: active ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.15)',
                        backgroundColor: active
                          ? 'rgba(6,78,59,0.06)'
                          : 'rgba(255,255,255,0.6)',
                      },
                    ]}
                  >
                    <View style={{ alignItems: rtl ? 'flex-end' : 'flex-start' }}>
                      <Text style={styles.langTitle}>{o.title}</Text>
                      <Text style={styles.langSub}>{o.sub}</Text>
                    </View>
                    {active && (
                      <View style={styles.checkBadge}>
                        <Check size={14} color={Colors.light.goldSoft} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* الخطوة 1: اسم وجنس الطفل */}
        {step === 1 && (
          <View>
            <Text
              style={[
                styles.title,
                styles.titleSmall,
                { fontFamily: rtl ? arabicSerif : latinSerif, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.kidTitle}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.kidSub}
            </Text>

            <Text
              style={[
                styles.label,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.nameLabel}
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={s.namePlaceholder}
              placeholderTextColor="rgba(26,42,36,0.35)"
              style={[
                styles.input,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            />

            <Text
              style={[
                styles.label,
                { marginTop: 24, fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.genderLabel}
            </Text>
            <View style={[styles.genderRow, rtl && styles.rowReverse]}>
              {(
                [
                  { id: 'boy', label: s.boy },
                  { id: 'girl', label: s.girl },
                ] as const
              ).map((g) => {
                const on = gender === g.id;
                return (
                  <Pressable
                    key={g.id}
                    onPress={() => setGender(g.id)}
                    style={[
                      styles.genderButton,
                      {
                        borderColor: on ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.15)',
                        backgroundColor: on ? Colors.light.emeraldDeep : 'rgba(255,255,255,0.6)',
                      },
                    ]}
                  >
                    <User size={26} color={on ? Colors.light.goldSoft : Colors.light.emeraldDeep} />
                    <Text
                      style={[
                        styles.genderLabel,
                        {
                          color: on ? Colors.light.goldSoft : Colors.light.emeraldDeep,
                          fontFamily: rtl ? arabicFont : latinFont,
                        },
                      ]}
                    >
                      {g.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* الخطوة 2: العمر */}
        {step === 2 && (
          <View>
            <Text
              style={[
                styles.title,
                styles.titleSmall,
                { fontFamily: rtl ? arabicSerif : latinSerif, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.ageTitle}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.ageSub}
            </Text>
            <View style={styles.ageGrid}>
              {['3-5', '6-8', '9-12'].map((a) => {
                const active = age === a;
                return (
                  <Pressable
                    key={a}
                    onPress={() => setAge(a)}
                    style={[
                      styles.ageCell,
                      {
                        borderColor: active ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.15)',
                        backgroundColor: active
                          ? Colors.light.emeraldDeep
                          : 'rgba(255,255,255,0.6)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.ageValue,
                        { color: active ? Colors.light.goldSoft : Colors.light.emeraldDeep, fontFamily: latinSerif },
                      ]}
                    >
                      {a}
                    </Text>
                    <Text
                      style={[
                        styles.ageUnit,
                        { color: active ? Colors.light.goldSoft : Colors.light.emeraldDeep, fontFamily: rtl ? arabicFont : latinFont },
                      ]}
                    >
                      {s.years}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* الخطوة 3: المواضيع المفضّلة */}
        {step === 3 && (
          <View>
            <Text
              style={[
                styles.title,
                styles.titleSmall,
                { fontFamily: rtl ? arabicSerif : latinSerif, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.themesTitle}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontFamily: rtl ? arabicFont : latinFont, textAlign: rtl ? 'right' : 'left' },
              ]}
            >
              {s.themesSub}
            </Text>
            <View style={styles.themeWrap}>
              {themeOptions.map((th) => {
                const on = picks.includes(th.ar);
                return (
                  <Pressable
                    key={th.ar}
                    onPress={() => toggle(th.ar)}
                    style={[
                      styles.themeChip,
                      {
                        borderColor: on ? Colors.light.emeraldDeep : 'rgba(6,78,59,0.2)',
                        backgroundColor: on ? Colors.light.emeraldDeep : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        fontFamily: rtl ? arabicFont : latinFont,
                        color: on ? Colors.light.goldSoft : Colors.light.emeraldDeep,
                      }}
                    >
                      {rtl ? th.ar : th.en}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <Pressable
        onPress={() => (step < 3 ? goToStep(step + 1) : handleFinish())}
        style={styles.ctaButton}
      >
        <Text style={[styles.ctaText, { fontFamily: rtl ? arabicFont : latinFont }]}>
          {step < 3 ? s.next : s.start}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 999,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(6,78,59,0.6)',
  },
  body: {
    flex: 1,
    marginTop: 32,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.emeraldDeep,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    color: Colors.light.emeraldDeep,
  },
  titleSmall: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(26,42,36,0.7)',
  },
  optionList: {
    marginTop: 32,
    gap: 12,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  langTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.emeraldDeep,
  },
  langSub: {
    fontSize: 12,
    color: 'rgba(26,42,36,0.6)',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.emeraldDeep,
  },
  label: {
    marginTop: 28,
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(6,78,59,0.7)',
  },
  input: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6,78,59,0.15)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.ink,
  },
  genderRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 4,
  },
  genderLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  ageGrid: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 12,
  },
  ageCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  ageUnit: {
    fontSize: 10,
    opacity: 0.8,
    marginTop: 2,
  },
  themeWrap: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ctaButton: {
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: Colors.light.emeraldDeep,
    shadowColor: Colors.light.emeraldDeep,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.goldSoft,
  },
});
