import { Image } from 'expo-image';
import { BookOpen, Download, Heart } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { stories, type Story } from './data';
import { hadiths, type Hadith } from './hadiths-data';

type Tab = 'stories' | 'hadith';

const SOURCE_LABEL_AR: Record<Hadith['source'], string> = {
	Bukhari: 'البخاري',
	Muslim: 'مسلم',
};

export function FavoritesScreen({
	onOpenStory,
}: {
	onOpenStory: (s: Story) => void;
}) {
	const [tab, setTab] = useState<Tab>('stories');
	const savedStories = stories.slice(0, 3);
	const savedHadith = hadiths.slice(0, 2);

	return (
		<ScrollView
			style={styles.root}
			contentContainerStyle={styles.scrollContent}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.title}>المفضّلة</Text>
				<Text style={styles.subtitle}>
					محفوظ للاستماع في أيّ وقت، حتى دون إنترنت
				</Text>
			</View>

			<View style={styles.section}>
				<View style={styles.tabsRow}>
					{(
						[
							['stories', 'القصص', savedStories.length],
							['hadith', 'الأحاديث', savedHadith.length],
						] as const
					).map(([id, label, n]) => {
						const active = tab === id;
						return (
							<Pressable
								key={id}
								onPress={() => setTab(id)}
								style={[
									styles.tabButton,
									active && {
										backgroundColor:
											Colors.light.emeraldDeep,
									},
								]}>
								<Text
									style={[
										styles.tabButtonText,
										{
											color: active
												? Colors.light.goldSoft
												: Colors.light.emeraldDeep,
										},
									]}>
									{label}
								</Text>
								<View
									style={[
										styles.tabBadge,
										{
											backgroundColor: active
												? 'rgba(255,255,255,0.15)'
												: 'rgba(6,78,59,0.1)',
										},
									]}>
									<Text
										style={[
											styles.tabBadgeText,
											{
												color: active
													? Colors.light.goldSoft
													: Colors.light.emeraldDeep,
											},
										]}>
										{n}
									</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
			</View>

			<View style={[styles.section, { marginTop: 20 }]}>
				{tab === 'stories' ? (
					<View style={styles.storyList}>
						{savedStories.map((s) => (
							<Pressable
								key={s.id}
								onPress={() => onOpenStory(s)}
								style={styles.storyRow}>
								<Image
									source={{ uri: s.cover }}
									style={styles.storyImage}
									contentFit='cover'
								/>
								<View style={styles.storyTextWrap}>
									<Text style={styles.storyTitle}>
										{s.titleAr}
									</Text>
									<Text style={styles.storyMeta}>
										{s.category} · {s.minutes} د
									</Text>
									<View style={styles.offlineBadge}>
										<Download
											size={10}
											color={Colors.light.emerald}
										/>
										<Text style={styles.offlineBadgeText}>
											جاهز دون إنترنت
										</Text>
									</View>
								</View>
								<Heart
									size={16}
									fill={Colors.light.emeraldDeep}
									color={Colors.light.emeraldDeep}
								/>
							</Pressable>
						))}
					</View>
				) : (
					<View style={styles.hadithList}>
						{savedHadith.map((h) => (
							<View key={h.id} style={styles.hadithCard}>
								<View style={styles.hadithTopRow}>
									<BookOpen
										size={14}
										color={Colors.light.emerald}
									/>
									<Text style={styles.hadithSourceText}>
										{SOURCE_LABEL_AR[h.source]} · {h.topic}
									</Text>
								</View>
								<Text style={styles.hadithText}>
									{h.textAr}
								</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, backgroundColor: Colors.light.cream },
	scrollContent: { paddingBottom: 140 },
	header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
	title: {
		fontSize: 24,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	subtitle: {
		marginTop: 4,
		fontSize: 12,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	section: { paddingHorizontal: 20 },
	tabsRow: {
		flexDirection: 'row',
		borderRadius: 999,
		padding: 4,
		backgroundColor: 'rgba(6,78,59,0.08)',
	},
	tabButton: {
		flex: 1,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		borderRadius: 999,
		paddingVertical: 8,
	},
	tabButtonText: {
		fontSize: 12,
		fontWeight: '700',
		fontFamily: Fonts?.arabicSans,
	},
	tabBadge: { borderRadius: 999, paddingHorizontal: 6, paddingVertical: 1 },
	tabBadgeText: { fontSize: 10, fontFamily: Fonts?.arabicSans },
	storyList: { gap: 12 },
	storyRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 12,
		borderRadius: 16,
		backgroundColor: '#fff',
		padding: 12,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	storyImage: { width: 80, height: 80, borderRadius: 12 },
	storyTextWrap: { flex: 1 },
	storyTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	storyMeta: {
		marginTop: 4,
		fontSize: 11,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	offlineBadge: {
		marginTop: 8,
		alignSelf: 'flex-end',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
		backgroundColor: 'rgba(13,122,95,0.1)',
	},
	offlineBadgeText: {
		fontSize: 10,
		fontWeight: '600',
		color: Colors.light.emerald,
		fontFamily: Fonts?.arabicSans,
	},
	hadithList: { gap: 12 },
	hadithCard: {
		borderRadius: 16,
		backgroundColor: '#fff',
		padding: 16,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	hadithTopRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 8,
	},
	hadithSourceText: {
		fontSize: 10,
		fontWeight: '600',
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
	hadithText: {
		marginTop: 8,
		fontSize: 17,
		lineHeight: 32,
		color: Colors.light.ink,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
});
