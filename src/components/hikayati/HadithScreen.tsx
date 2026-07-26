import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { hadiths, type Hadith } from './hadiths-data';

const SOURCES = ['الكل', 'البخاري', 'مسلم'] as const;
type SourceFilter = (typeof SOURCES)[number];

const SOURCE_MAP: Record<SourceFilter, Hadith['source'] | null> = {
	الكل: null,
	البخاري: 'Bukhari',
	مسلم: 'Muslim',
};

const SOURCE_LABEL_AR: Record<Hadith['source'], string> = {
	Bukhari: 'البخاري',
	Muslim: 'مسلم',
};

export function HadithScreen() {
	const [src, setSrc] = useState<SourceFilter>('الكل');
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const filter = SOURCE_MAP[src];
	const list = filter ? hadiths.filter((h) => h.source === filter) : hadiths;

	return (
		<LinearGradient
			colors={[Colors.light.cream, Colors.light.creamDeep]}
			style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.title}>بستان الأحاديث</Text>
					<Text style={styles.subtitle}>
						مختارات موثّقة من صحيح البخاري وصحيح مسلم
					</Text>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.sourceRow}>
					{SOURCES.map((s) => {
						const on = s === src;
						return (
							<Pressable
								key={s}
								onPress={() => setSrc(s)}
								style={[
									styles.sourceChip,
									on
										? {
												backgroundColor:
													Colors.light.emeraldDeep,
											}
										: {
												backgroundColor:
													'rgba(255,255,255,0.7)',
												borderWidth: 1,
												borderColor:
													'rgba(6,78,59,0.12)',
											},
								]}>
								<Text
									style={[
										styles.sourceChipText,
										{
											color: on
												? Colors.light.goldSoft
												: Colors.light.emeraldDeep,
										},
									]}>
									{s}
								</Text>
							</Pressable>
						);
					})}
				</ScrollView>

				<View style={styles.list}>
					{list.map((h) => (
						<HadithCard
							key={h.id}
							hadith={h}
							showTranslation={!!expanded[h.id]}
							onToggleTranslation={() =>
								setExpanded((m) => ({ ...m, [h.id]: !m[h.id] }))
							}
						/>
					))}
				</View>
			</ScrollView>
		</LinearGradient>
	);
}

function HadithCard({
	hadith,
	showTranslation,
	onToggleTranslation,
}: {
	hadith: Hadith;
	showTranslation: boolean;
	onToggleTranslation: () => void;
}) {
	return (
		<View style={styles.card}>
			<View style={styles.cornerOrnament} />

			<View style={styles.cardTopRow}>
				<View style={styles.sourceBadge}>
					<Text style={styles.sourceBadgeText}>
						{SOURCE_LABEL_AR[hadith.source]}
					</Text>
				</View>
				<View style={styles.cardActions}>
					<Pressable hitSlop={8}>
						<Share2
							size={14}
							color={Colors.light.emeraldDeep}
							opacity={0.6}
						/>
					</Pressable>
					<Pressable hitSlop={8}>
						<Bookmark
							size={14}
							color={Colors.light.emeraldDeep}
							opacity={0.6}
						/>
					</Pressable>
				</View>
			</View>

			<Text style={styles.hadithText}>{hadith.textAr}</Text>

			<Pressable onPress={onToggleTranslation}>
				<Text style={styles.toggleText}>
					{showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة'}
				</Text>
			</Pressable>

			{showTranslation && (
				<View style={styles.translationBox}>
					<Text style={styles.translationText}>
						{hadith.translationEn}
					</Text>
				</View>
			)}

			<View style={styles.cardFooter}>
				<Text style={styles.footerText}>
					راوي الحديث: {hadith.narrator}
				</Text>
				<Text style={styles.footerTextBold}>{hadith.topic}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1 },
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
	sourceRow: {
		flexDirection: 'row-reverse',
		gap: 8,
		paddingHorizontal: 20,
		paddingBottom: 4,
	},
	sourceChip: {
		borderRadius: 999,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	sourceChipText: {
		fontSize: 12,
		fontWeight: '600',
		fontFamily: Fonts?.arabicSans,
	},
	list: {
		marginTop: 16,
		paddingHorizontal: 20,
		gap: 12,
	},
	card: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 24,
		backgroundColor: '#fff',
		padding: 20,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	cornerOrnament: {
		position: 'absolute',
		top: -24,
		left: -24,
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.light.gold,
		opacity: 0.1,
	},
	cardTopRow: {
		flexDirection: 'row-reverse',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: 8,
	},
	sourceBadge: {
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 2,
		backgroundColor: Colors.light.emeraldDeep,
	},
	sourceBadgeText: {
		fontSize: 10,
		fontWeight: '700',
		color: Colors.light.goldSoft,
		fontFamily: Fonts?.arabicSans,
	},
	cardActions: { flexDirection: 'row-reverse', gap: 12 },
	hadithText: {
		marginTop: 12,
		fontSize: 18,
		lineHeight: 34,
		color: Colors.light.ink,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	toggleText: {
		marginTop: 12,
		fontSize: 11,
		fontWeight: '600',
		color: Colors.light.emerald,
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	translationBox: {
		marginTop: 8,
		borderRadius: 12,
		backgroundColor: Colors.light.cream,
		padding: 12,
	},
	translationText: {
		fontSize: 12,
		lineHeight: 20,
		fontStyle: 'italic',
		color: 'rgba(26,42,36,0.75)',
		fontFamily: Fonts?.sans,
		textAlign: 'left',
	},
	cardFooter: {
		marginTop: 16,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: 'rgba(6,78,59,0.1)',
		paddingTop: 12,
	},
	footerText: {
		fontSize: 10,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
	footerTextBold: {
		fontSize: 10,
		fontWeight: '600',
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
});
