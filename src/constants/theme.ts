import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
	light: {
		text: '#1a2a24', // --color-ink
		textSecondary: 'rgba(26,42,36,0.6)',
		background: '#f5f0e0', // --color-cream
		backgroundElement: '#ece4cd', // --color-cream-deep
		backgroundSelected: 'rgba(6,78,59,0.08)',
		emeraldDeep: '#064e3b', // --color-emerald-deep
		emerald: '#0d7a5f', // --color-emerald
		gold: '#c9a84c', // --color-gold
		goldSoft: '#e7d59a', // --color-gold-soft
		cream: '#f5f0e0',
		creamDeep: '#ece4cd',
		ink: '#1a2a24',
	},
	dark: {
		text: '#f5f0e0',
		textSecondary: 'rgba(245,240,224,0.6)',
		background: '#0a1f18',
		backgroundElement: '#0f2a20',
		backgroundSelected: 'rgba(201,168,76,0.12)',
		emeraldDeep: '#064e3b',
		emerald: '#0d7a5f',
		gold: '#c9a84c',
		goldSoft: '#e7d59a',
		cream: '#f5f0e0',
		creamDeep: '#ece4cd',
		ink: '#1a2a24',
	},
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
	web: {
		sans: 'var(--font-body)',
		serif: 'var(--font-display)',
		rounded: 'var(--font-body)',
		mono: 'ui-monospace',
		arabicSerif: 'var(--font-arabic-serif)',
		arabicSans: 'var(--font-arabic-sans)',
		arabicEasy: 'var(--font-arabic-easy)',
	},
	default: {
		sans: 'NunitoSans_400Regular',
		serif: 'Lora_400Regular',
		rounded: 'NunitoSans_600SemiBold',
		mono: Platform.select({ ios: 'ui-monospace', default: 'monospace' }),
		arabicSerif: 'Amiri_400Regular',
		arabicSans: 'Cairo_400Regular',
		arabicEasy: 'ReadexPro_400Regular',
	},
});

export const FontWeights = Platform.select({
	web: {
		arabicSerifBold: 'var(--font-arabic-serif)',
		arabicSansBold: 'var(--font-arabic-sans)',
		displayBold: 'var(--font-display)',
	},
	default: {
		arabicSerifBold: 'Amiri_700Bold',
		arabicSansBold: 'Cairo_700Bold',
		displayBold: 'Lora_600SemiBold',
	},
});

export const Spacing = {
	half: 2,
	one: 4,
	two: 8,
	three: 16,
	four: 24,
	five: 32,
	six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
