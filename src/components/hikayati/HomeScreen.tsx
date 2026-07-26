import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
	ArrowRight,
	Bell,
	CheckCircle2,
	Clock,
	Download,
	Flame,
	Headphones,
	Play,
	Sparkles,
} from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { categories, stories, type Story } from './data';

const WEEKDAY_LABELS_AR = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];
const WEEK_VALUES = [6, 12, 8, 0, 15, 22, 14];

export function HomeScreen({
	onOpenStory,
}: {
	onOpenStory: (s: Story, opts?: { resume?: boolean }) => void;
}) {
	const featured = stories[0];
	const rest = stories.slice(1);
	const inProgress = stories.filter(
		(s) => (s.progress ?? 0) > 0 && (s.progress ?? 0) < 1,
	);

	const savedCount = stories.filter(
		(s) => s.downloaded || (s.progress ?? 0) > 0,
	).length;
	const completedCount = stories.filter((s) => (s.progress ?? 0) >= 1).length;
	const avgCompletion = savedCount
		? Math.round(
				(stories
					.filter((s) => s.downloaded || (s.progress ?? 0) > 0)
					.reduce((sum, s) => sum + Math.min(1, s.progress ?? 0), 0) /
					savedCount) *
					100,
			)
		: 0;
	const minutesThisWeek =
		stories.reduce(
			(sum, s) =>
				sum + Math.round(s.minutes * Math.min(1, s.progress ?? 0)),
			0,
		) + 14;

	return (
		<LinearGradient
			colors={[Colors.light.cream, Colors.light.creamDeep]}
			style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>السلام عليكم</Text>
						<Text style={styles.greetingName}>
							أهلاً بكِ، أُمَّ يوسف
						</Text>
					</View>
					<Pressable style={styles.bellButton}>
						<Bell size={18} color={Colors.light.emeraldDeep} />
						<View style={styles.bellDot} />
					</Pressable>
				</View>

				<View style={styles.section}>
					<Pressable
						onPress={() => onOpenStory(featured)}
						style={styles.hero}>
						<Image
							source={{ uri: featured.cover }}
							style={StyleSheet.absoluteFill}
							contentFit='cover'
						/>
						<LinearGradient
							colors={['rgba(6,78,59,0.15)', 'rgba(6,78,59,0.9)']}
							locations={[0.4, 1]}
							style={StyleSheet.absoluteFill}
						/>
						<View style={styles.heroTopRow}>
							<View style={styles.heroBadgeGold}>
								<Text style={styles.heroBadgeGoldText}>
									قصّة اليوم
								</Text>
							</View>
							<View style={styles.heroBadgeDark}>
								<Headphones size={12} color='#fff' />
								<Text style={styles.heroBadgeDarkText}>
									صوتي
								</Text>
							</View>
						</View>
						<View style={styles.heroBottom}>
							<Text style={styles.heroTitle}>
								{featured.titleAr}
							</Text>
							<View style={styles.heroMetaRow}>
								<View style={styles.heroMetaInfo}>
									<View style={styles.heroMetaItem}>
										<Clock size={12} color='#fff' />
										<Text style={styles.heroMetaText}>
											{featured.minutes} د
										</Text>
									</View>
									<Text style={styles.heroMetaText}>
										{featured.ageBand} سنوات
									</Text>
								</View>
								<View style={styles.playButton}>
									<Play
										size={16}
										fill={Colors.light.emeraldDeep}
										color={Colors.light.emeraldDeep}
									/>
								</View>
							</View>
						</View>
					</Pressable>
				</View>

				{inProgress.length > 0 && (
					<View style={styles.section}>
						<View style={styles.sectionHeaderRow}>
							<Text style={styles.sectionTitle}>
								أكمل من حيث توقّفت
							</Text>
							<View style={styles.sectionLinkRow}>
								<ArrowRight
									size={11}
									color='rgba(26,42,36,0.5)'
								/>
								<Text style={styles.sectionLinkText}>
									متابعة
								</Text>
							</View>
						</View>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.continueRow}>
							{inProgress.map((s) => (
								<ContinueCard
									key={s.id}
									story={s}
									onPress={() =>
										onOpenStory(s, { resume: true })
									}
								/>
							))}
						</ScrollView>
					</View>
				)}

				<View style={styles.section}>
					<View style={styles.sectionHeaderRow}>
						<Text style={styles.sectionTitle}>
							رحلة القراءة هذا الأسبوع
						</Text>
						<View style={styles.parentBadge}>
							<Text style={styles.parentBadgeText}>للأهل</Text>
						</View>
					</View>

					<LinearGradient
						colors={[Colors.light.emeraldDeep, '#0d7a5f']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.statsCard}>
						<View style={styles.statsTopRow}>
							<View>
								<Text style={styles.statsLabel}>
									هذا الأسبوع
								</Text>
								<View style={styles.statsMinutesRow}>
									<Text style={styles.statsMinutesValue}>
										{minutesThisWeek}
									</Text>
									<Text style={styles.statsMinutesUnit}>
										دقيقة قراءة واستماع
									</Text>
								</View>
							</View>
							<View style={styles.streakChip}>
								<Flame size={12} color={Colors.light.gold} />
								<Text style={styles.streakText}>
									٥ أيام متتالية
								</Text>
							</View>
						</View>

						<View style={styles.barsRow}>
							{WEEK_VALUES.map((v, i) => {
								const max = 25;
								const heightPct = Math.max(6, (v / max) * 100);
								const isToday = i === 6;
								return (
									<View key={i} style={styles.barColumn}>
										<View
											style={[
												styles.bar,
												{
													height: `${heightPct}%`,
													backgroundColor: isToday
														? Colors.light.gold
														: 'rgba(245,240,224,0.35)',
												},
											]}
										/>
									</View>
								);
							})}
						</View>
						<View style={styles.barsLabelRow}>
							{WEEKDAY_LABELS_AR.map((d, i) => (
								<Text key={i} style={styles.barsLabelText}>
									{d}
								</Text>
							))}
						</View>

						<View style={styles.statChipsRow}>
							<StatChip
								icon={
									<CheckCircle2
										size={14}
										color={Colors.light.gold}
									/>
								}
								value={String(completedCount)}
								label='قصص مكتملة'
							/>
							<StatChip
								icon={
									<Sparkles
										size={14}
										color={Colors.light.gold}
									/>
								}
								value={`${avgCompletion}٪`}
								label='متوسّط الإنجاز'
							/>
							<StatChip
								icon={
									<Clock
										size={14}
										color={Colors.light.gold}
									/>
								}
								value={String(inProgress.length)}
								label='قيد المتابعة'
							/>
						</View>
					</LinearGradient>
				</View>

				<View style={[styles.section, { marginTop: 8 }]}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.categoriesRow}>
						{categories.map((c, i) => (
							<View
								key={c.id}
								style={[
									styles.categoryChip,
									i === 0
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
										styles.categoryChipText,
										{
											color:
												i === 0
													? Colors.light.goldSoft
													: Colors.light.emeraldDeep,
										},
									]}>
									{c.labelAr}
								</Text>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={[styles.section, { marginTop: 4 }]}>
					<View style={styles.sectionHeaderRow}>
						<Text style={styles.sectionTitle}>مكتبة القصص</Text>
						<Text style={styles.viewAllText}>الكل ›</Text>
					</View>
					<View style={styles.grid}>
						{rest.map((s) => (
							<StoryCard
								key={s.id}
								story={s}
								onPress={() => onOpenStory(s)}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
}

function StoryCard({ story, onPress }: { story: Story; onPress: () => void }) {
	return (
		<Pressable onPress={onPress} style={styles.storyCard}>
			<View style={styles.storyCardImageWrap}>
				<Image
					source={{ uri: story.cover }}
					style={StyleSheet.absoluteFill}
					contentFit='cover'
				/>
				<View style={styles.ageBadge}>
					<Text style={styles.ageBadgeText}>{story.ageBand}</Text>
				</View>
				{story.downloaded && (
					<View style={styles.downloadBadge}>
						<Download
							size={11}
							strokeWidth={2.5}
							color={Colors.light.emeraldDeep}
						/>
					</View>
				)}
			</View>
			<View style={styles.storyCardBody}>
				<Text style={styles.storyCardTitle} numberOfLines={1}>
					{story.titleAr}
				</Text>
				<View style={styles.storyCardMetaRow}>
					<Text style={styles.storyCardMetaText}>
						{story.category}
					</Text>
					<View style={styles.storyCardMetaItem}>
						<Clock size={10} color='rgba(26,42,36,0.6)' />
						<Text style={styles.storyCardMetaText}>
							{story.minutes} د
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}

function ContinueCard({
	story,
	onPress,
}: {
	story: Story;
	onPress: () => void;
}) {
	const pct = Math.round((story.progress ?? 0) * 100);
	return (
		<Pressable onPress={onPress} style={styles.continueCard}>
			<View style={styles.continueImageWrap}>
				<Image
					source={{ uri: story.cover }}
					style={StyleSheet.absoluteFill}
					contentFit='cover'
				/>
				<View style={styles.continueImageOverlay}>
					<View style={styles.continuePlayButton}>
						<Play
							size={12}
							fill={Colors.light.emeraldDeep}
							color={Colors.light.emeraldDeep}
						/>
					</View>
				</View>
			</View>
			<View style={styles.continueBody}>
				<View>
					<Text style={styles.continueTitle} numberOfLines={1}>
						{story.titleAr}
					</Text>
					<Text style={styles.continueSubtitle} numberOfLines={1}>
						{story.lastOpenedAr}
					</Text>
				</View>
				<View>
					<View style={styles.progressTrack}>
						<View
							style={[styles.progressFill, { width: `${pct}%` }]}
						/>
					</View>
					<View style={styles.continueFooterRow}>
						<Text style={styles.continueFooterText}>{pct}٪</Text>
						<Text style={styles.continueFooterText}>
							يتبقّى{' '}
							{Math.max(
								1,
								Math.round(
									story.minutes * (1 - (story.progress ?? 0)),
								),
							)}{' '}
							د
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}

function StatChip({
	icon,
	value,
	label,
}: {
	icon: React.ReactNode;
	value: string;
	label: string;
}) {
	return (
		<View style={styles.statChip}>
			<View style={styles.statChipTop}>
				{icon}
				<Text style={styles.statChipValue}>{value}</Text>
			</View>
			<Text style={styles.statChipLabel}>{label}</Text>
		</View>
	);
}

const CARD_RADIUS = 24;

const styles = StyleSheet.create({
	root: { flex: 1 },
	scrollContent: { paddingBottom: 120 },
	header: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 12,
	},
	greeting: {
		fontSize: 11,
		fontWeight: '600',
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	greetingName: {
		fontSize: 20,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	bellButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(6,78,59,0.08)',
	},
	bellDot: {
		position: 'absolute',
		top: 8,
		left: 8,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.light.gold,
	},
	section: { paddingHorizontal: 20, marginTop: 24 },
	hero: {
		height: 220,
		borderRadius: CARD_RADIUS,
		overflow: 'hidden',
		shadowColor: Colors.light.emeraldDeep,
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.5,
		shadowRadius: 30,
		elevation: 10,
	},
	heroTopRow: {
		position: 'absolute',
		top: 12,
		left: 16,
		right: 16,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	heroBadgeGold: {
		backgroundColor: Colors.light.gold,
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	heroBadgeGoldText: {
		fontSize: 10,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	heroBadgeDark: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	heroBadgeDarkText: {
		fontSize: 10,
		fontWeight: '600',
		color: '#fff',
		fontFamily: Fonts?.arabicSans,
	},
	heroBottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 16,
	},
	heroTitle: {
		fontSize: 24,
		color: '#fff',
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	heroMetaRow: {
		marginTop: 8,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	heroMetaInfo: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 12,
	},
	heroMetaItem: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
	},
	heroMetaText: {
		fontSize: 11,
		color: '#fff',
		opacity: 0.9,
		fontFamily: Fonts?.arabicSans,
	},
	playButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.gold,
	},
	sectionHeaderRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 18,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	sectionLinkRow: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
	},
	sectionLinkText: {
		fontSize: 10,
		fontWeight: '600',
		color: 'rgba(26,42,36,0.5)',
		fontFamily: Fonts?.arabicSans,
	},
	continueRow: { flexDirection: 'row-reverse', gap: 12, paddingBottom: 4 },
	continueCard: {
		width: 256,
		flexDirection: 'row-reverse',
		gap: 12,
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 10,
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	continueImageWrap: {
		width: 80,
		height: 80,
		borderRadius: 14,
		overflow: 'hidden',
	},
	continueImageOverlay: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'rgba(6,78,59,0.35)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	continuePlayButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.gold,
	},
	continueBody: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 2,
	},
	continueTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	continueSubtitle: {
		marginTop: 2,
		fontSize: 10,
		color: 'rgba(26,42,36,0.55)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	progressTrack: {
		height: 6,
		borderRadius: 999,
		backgroundColor: 'rgba(6,78,59,0.12)',
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		borderRadius: 999,
		backgroundColor: Colors.light.gold,
	},
	continueFooterRow: {
		marginTop: 4,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
	},
	continueFooterText: {
		fontSize: 10,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
	parentBadge: {
		backgroundColor: 'rgba(6,78,59,0.08)',
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	parentBadgeText: {
		fontSize: 9,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	statsCard: { borderRadius: CARD_RADIUS, padding: 16 },
	statsTopRow: {
		flexDirection: 'row-reverse',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	statsLabel: {
		fontSize: 10,
		fontWeight: '600',
		color: Colors.light.cream,
		opacity: 0.7,
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	statsMinutesRow: {
		marginTop: 4,
		flexDirection: 'row-reverse',
		alignItems: 'baseline',
		gap: 4,
	},
	statsMinutesValue: {
		fontSize: 36,
		color: Colors.light.gold,
		fontFamily: Fonts?.arabicSerif,
	},
	statsMinutesUnit: {
		fontSize: 12,
		color: Colors.light.cream,
		opacity: 0.8,
		fontFamily: Fonts?.arabicSans,
	},
	streakChip: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
		backgroundColor: 'rgba(201,168,76,0.2)',
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	streakText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.light.gold,
		fontFamily: Fonts?.arabicSans,
	},
	barsRow: {
		marginTop: 16,
		height: 56,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		gap: 6,
	},
	barColumn: { flex: 1, height: '100%', justifyContent: 'flex-end' },
	bar: { width: '100%', borderRadius: 999 },
	barsLabelRow: {
		marginTop: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	barsLabelText: {
		flex: 1,
		textAlign: 'center',
		fontSize: 9,
		fontWeight: '600',
		color: Colors.light.cream,
		opacity: 0.6,
	},
	statChipsRow: { marginTop: 16, flexDirection: 'row', gap: 8 },
	statChip: {
		flex: 1,
		borderRadius: 16,
		paddingVertical: 10,
		paddingHorizontal: 4,
		backgroundColor: 'rgba(245,240,224,0.1)',
	},
	statChipTop: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
	},
	statChipValue: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.light.gold,
	},
	statChipLabel: {
		marginTop: 2,
		fontSize: 10,
		opacity: 0.75,
		color: Colors.light.cream,
		textAlign: 'center',
		fontFamily: Fonts?.arabicSans,
	},
	categoriesRow: { flexDirection: 'row-reverse', gap: 8 },
	categoryChip: {
		borderRadius: 999,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	categoryChipText: {
		fontSize: 12,
		fontWeight: '600',
		fontFamily: Fonts?.arabicSans,
	},
	viewAllText: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.light.emerald,
		fontFamily: Fonts?.arabicSans,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		justifyContent: 'space-between',
	},
	storyCard: {
		width: '48%',
		backgroundColor: '#fff',
		borderRadius: 18,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: 'rgba(6,78,59,0.08)',
	},
	storyCardImageWrap: { aspectRatio: 4 / 3, overflow: 'hidden' },
	ageBadge: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: 'rgba(6,78,59,0.85)',
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	ageBadgeText: {
		fontSize: 9,
		fontWeight: '700',
		color: Colors.light.goldSoft,
	},
	downloadBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		width: 24,
		height: 24,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.gold,
	},
	storyCardBody: { padding: 12 },
	storyCardTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	storyCardMetaRow: {
		marginTop: 4,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	storyCardMetaText: {
		fontSize: 10,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
	storyCardMetaItem: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 4,
	},
});
