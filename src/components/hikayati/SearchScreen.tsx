import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import {
	Clock,
	Headphones,
	Search as SearchIcon,
	X,
} from 'lucide-react-native';
import { useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { stories, type Story } from './data';

const RECENT_SEARCHES = ['الأنبياء', 'الكرم', 'قصص قصيرة', 'قبل النوم'];
const THEME_OPTIONS = ['الأنبياء', 'الصحابة', 'الأخلاق', 'الأدعية', 'الحديث'];
const LENGTH_OPTIONS = ['قصير', 'متوسط', 'طويل'] as const;

export function SearchScreen({
	onOpenStory,
}: Readonly<{
	onOpenStory: (s: Story) => void;
}>) {
	const [q, setQ] = useState('');
	const [themes, setThemes] = useState<string[]>(['الأخلاق']);
	const [ageRange, setAgeRange] = useState(8);
	const [length, setLength] =
		useState<(typeof LENGTH_OPTIONS)[number]>('متوسط');
	const [audioOnly, setAudioOnly] = useState(true);

	const toggleTheme = (t: string) =>
		setThemes((prev) =>
			prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
		);

	return (
		<ScrollView
			style={styles.root}
			contentContainerStyle={styles.scrollContent}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.title}>البحث</Text>
				<View style={styles.searchBox}>
					<SearchIcon size={16} color={Colors.light.emeraldDeep} />
					<TextInput
						value={q}
						onChangeText={setQ}
						placeholder='ابحث عن قصّة أو حديث…'
						placeholderTextColor='rgba(26,42,36,0.4)'
						style={styles.searchInput}
					/>
					{q.length > 0 && (
						<Pressable onPress={() => setQ('')} hitSlop={8}>
							<X size={14} color={Colors.light.ink} />
						</Pressable>
					)}
				</View>
			</View>

			{q.length === 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionLabel}>عمليات بحث حديثة</Text>
					<View style={styles.recentWrap}>
						{RECENT_SEARCHES.map((r) => (
							<Pressable
								key={r}
								onPress={() => setQ(r)}
								style={styles.recentChip}>
								<Clock
									size={11}
									color={Colors.light.emeraldDeep}
								/>
								<Text style={styles.recentChipText}>{r}</Text>
							</Pressable>
						))}
					</View>
				</View>
			)}

			<View style={[styles.section, { marginTop: 20 }]}>
				<View style={styles.filterCard}>
					<Text style={styles.filterCardTitle}>تصفية النتائج</Text>

					<View style={styles.filterGroup}>
						<Text style={styles.filterGroupLabel}>الموضوع</Text>
						<View style={styles.themeWrap}>
							{THEME_OPTIONS.map((t) => {
								const on = themes.includes(t);
								return (
									<Pressable
										key={t}
										onPress={() => toggleTheme(t)}
										style={[
											styles.themeChip,
											{
												backgroundColor: on
													? Colors.light.emeraldDeep
													: 'rgba(6,78,59,0.06)',
											},
										]}>
										<Text
											style={[
												styles.themeChipText,
												{
													color: on
														? Colors.light.goldSoft
														: Colors.light
																.emeraldDeep,
												},
											]}>
											{t}
										</Text>
									</Pressable>
								);
							})}
						</View>
					</View>

					<View style={styles.filterGroup}>
						<Text style={styles.filterGroupLabel}>
							العمر: حتى {ageRange} سنوات
						</Text>
						<Slider
							value={ageRange}
							onValueChange={setAgeRange}
							minimumValue={3}
							maximumValue={12}
							step={1}
							minimumTrackTintColor={Colors.light.emeraldDeep}
							maximumTrackTintColor='rgba(6,78,59,0.15)'
							thumbTintColor={Colors.light.emeraldDeep}
							style={styles.slider}
						/>
					</View>

					<View style={styles.filterGroup}>
						<Text style={styles.filterGroupLabel}>الطول</Text>
						<View style={styles.lengthGroup}>
							{LENGTH_OPTIONS.map((l) => {
								const on = l === length;
								return (
									<Pressable
										key={l}
										onPress={() => setLength(l)}
										style={[
											styles.lengthOption,
											on && {
												backgroundColor:
													Colors.light.emeraldDeep,
											},
										]}>
										<Text
											style={[
												styles.lengthOptionText,
												{
													color: on
														? Colors.light.goldSoft
														: Colors.light
																.emeraldDeep,
												},
											]}>
											{l}
										</Text>
									</Pressable>
								);
							})}
						</View>
					</View>

					<View style={styles.audioRow}>
						<View style={styles.audioLabelRow}>
							<Headphones
								size={14}
								color={Colors.light.emeraldDeep}
							/>
							<Text style={styles.audioLabelText}>
								مع تسجيل صوتي فقط
							</Text>
						</View>
						<Pressable
							onPress={() => setAudioOnly((v) => !v)}
							style={[
								styles.toggleTrack,
								{
									backgroundColor: audioOnly
										? Colors.light.emeraldDeep
										: 'rgba(6,78,59,0.2)',
								},
							]}>
							<View
								style={[
									styles.toggleThumb,
									{
										alignSelf: audioOnly
											? 'flex-end'
											: 'flex-start',
									},
								]}
							/>
						</Pressable>
					</View>
				</View>
			</View>

			<View style={[styles.section, { marginTop: 20 }]}>
				<Text style={styles.sectionLabel}>نتائج مقترحة</Text>
				<View style={styles.resultsList}>
					{stories.slice(0, 3).map((s) => (
						<Pressable
							key={s.id}
							onPress={() => onOpenStory(s)}
							style={styles.resultRow}>
							<Image
								source={{ uri: s.cover }}
								style={styles.resultImage}
								contentFit='cover'
							/>
							<View style={styles.resultTextWrap}>
								<Text style={styles.resultTitle}>
									{s.titleAr}
								</Text>
								<Text style={styles.resultMeta}>
									{s.category} · {s.minutes} دقائق ·{' '}
									{s.ageBand}
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, backgroundColor: Colors.light.cream },
	scrollContent: { paddingBottom: 140 },
	header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
	title: {
		marginBottom: 12,
		fontSize: 24,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	searchBox: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 8,
		borderRadius: 16,
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.1)',
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: Colors.light.ink,
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	section: { paddingHorizontal: 20, marginTop: 16 },
	sectionLabel: {
		marginBottom: 8,
		fontSize: 12,
		fontWeight: '700',
		color: 'rgba(26,42,36,0.7)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	recentWrap: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 },
	recentChip: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'rgba(255,255,255,0.7)',
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.1)',
	},
	recentChipText: {
		fontSize: 12,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	filterCard: {
		borderRadius: 24,
		backgroundColor: '#fff',
		padding: 16,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	filterCardTitle: {
		marginBottom: 12,
		fontSize: 14,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	filterGroup: { marginBottom: 16 },
	filterGroupLabel: {
		marginBottom: 6,
		fontSize: 11,
		fontWeight: '600',
		color: 'rgba(26,42,36,0.7)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	themeWrap: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 6 },
	themeChip: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
	themeChipText: {
		fontSize: 11,
		fontWeight: '600',
		fontFamily: Fonts?.arabicSans,
	},
	slider: { width: '100%', height: 32 },
	lengthGroup: {
		flexDirection: 'row',
		borderRadius: 999,
		padding: 4,
		backgroundColor: 'rgba(6,78,59,0.06)',
	},
	lengthOption: {
		flex: 1,
		borderRadius: 999,
		paddingVertical: 6,
		alignItems: 'center',
	},
	lengthOptionText: {
		fontSize: 11,
		fontWeight: '700',
		fontFamily: Fonts?.arabicSans,
	},
	audioRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	audioLabelRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 8,
	},
	audioLabelText: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	toggleTrack: {
		width: 44,
		height: 24,
		borderRadius: 12,
		padding: 2,
		justifyContent: 'center',
	},
	toggleThumb: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	resultsList: { gap: 8 },
	resultRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 12,
		borderRadius: 16,
		backgroundColor: '#fff',
		padding: 10,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	resultImage: { width: 56, height: 56, borderRadius: 12 },
	resultTextWrap: { flex: 1 },
	resultTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	resultMeta: {
		marginTop: 2,
		fontSize: 10,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
});
