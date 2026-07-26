/**
 * وضع الطفل (Kid Mode) — سياق عام يُقفل تبويبات معينة (بحث، إعدادات) عن الطفل.
 * منقول عن src/components/hikayati/kidMode.tsx في تصميم Lovable الأصلي،
 * مع إعادة بناء HoldToUnlock بمكوّنات React Native (Pressable + Reanimated)
 * بدل أحداث الفأرة/المؤشر (onPointerDown/Up) غير المتوفرة على الموبايل.
 */
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';

import { Colors } from '@/constants/theme';

type KidModeCtx = {
  kidMode: boolean;
  setKidMode: (v: boolean) => void;
};

const Ctx = createContext<KidModeCtx>({ kidMode: false, setKidMode: () => {} });

export function KidModeProvider({ children }: { children: React.ReactNode }) {
  const [kidMode, setKidMode] = useState(false);
  return <Ctx.Provider value={{ kidMode, setKidMode }}>{children}</Ctx.Provider>;
}

export function useKidMode() {
  return useContext(Ctx);
}

const HOLD_DURATION_MS = 1600;

/**
 * زر "اضغط مطوّلاً للخروج" — يمنع الطفل من الخروج بضغطة سريعة عرضية.
 * يعتمد على Reanimated لحركة التعبئة، و onPressIn/onPressOut بدل أحداث المؤشر.
 */
export function HoldToUnlock({
  label = 'اضغط مطوّلاً للخروج',
  doneLabel = 'تم الفتح',
  onComplete,
  duration = HOLD_DURATION_MS,
  dark = false,
  style,
}: {
  label?: string;
  doneLabel?: string;
  onComplete: () => void;
  duration?: number;
  dark?: boolean;
  style?: ViewStyle;
}) {
  const progress = useSharedValue(0);
  const [isDone, setIsDone] = useState(false);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsDone(true);
    onComplete();
  }, [onComplete]);

  const begin = useCallback(() => {
    completedRef.current = false;
    setIsDone(false);
    progress.value = 0;
    progress.value = withTiming(1, { duration }, (finished) => {
      if (finished) runOnJS(handleComplete)();
    });
  }, [duration, progress, handleComplete]);

  const stop = useCallback(() => {
    cancelAnimation(progress);
    progress.value = withTiming(0, { duration: 150 });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Pressable
      onPressIn={begin}
      onPressOut={stop}
      style={[
        styles.holdButton,
        { backgroundColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(6,78,59,0.08)' },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.holdFill,
          fillStyle,
          { backgroundColor: Colors.light.gold, opacity: 0.55 },
        ]}
      />
      <Text
        style={[
          styles.holdLabel,
          { color: dark ? Colors.light.goldSoft : Colors.light.emeraldDeep },
        ]}
      >
        {isDone ? doneLabel : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  holdButton: {
    width: '100%',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  holdFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
  holdLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});
