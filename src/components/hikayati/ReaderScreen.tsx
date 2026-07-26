import { Image } from 'expo-image';
import {
	Baby,
	ChevronRight,
	Heart,
	Lock,
	Moon,
	Pause,
	Play,
	RotateCcw,
	Share2,
	SkipBack,
	SkipForward,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import type { Story } from './data';
import { HoldToUnlock, useKidMode } from './kid-mode';

type Tab = 'read' | 'listen';

function fmt(totalSeconds: number) {
	const m = Math.floor(totalSeconds / 60);
	const s = totalSeconds % 60;
	return `${m}:${String(s).padStart(2, '0')}`;
}

export function ReaderScreen({
	story,
	onBack,
	resumeFrom,
}: {
	story: Story;
	onBack: () => void;
	resumeFrom?: number;
}) {
	const isResuming =
		typeof resumeFrom === 'number' && resumeFrom > 0 && resumeFrom < 1;
	const progress = isResuming ? resumeFrom! : 0;
	const [tab, setTab] = useState<Tab>(isResuming ? 'listen' : 'read');
	const [playing, setPlaying] = useState(false);
	const [saved, setSaved] = useState(false);
	const [easyFontPref, setEasyFontPref] = useState(true);
	const { kidMode, setKidMode } = useKidMode();
	const easyFont = kidMode ? true : easyFontPref;

	const readerFontFamily = easyFont ? Fonts?.arabicEasy : Fonts?.arabicSerif;

	const totalSec = story.minutes * 60;
	const elapsedSec = Math.round(totalSec * progress);
	const remainingSec = totalSec - elapsedSec;

	const paragraphs = [
		story.category,
		'وكان في القافلةِ رجلٌ اسمه سليمان، رأى الغرباءَ متعبين ظمآنين، فقال: «إنَّ الماءَ الذي معنا يكفينا وإيّاهم إن قسّمناه بالعدل.» فوزَّع التمر، وسقى الجميعَ من قربتِه، فباركَ اللهُ في القليل حتى شرب الجميع.',
	];
	const currentParagraph = isResuming
		? Math.min(
				paragraphs.length - 1,
				Math.floor(progress * paragraphs.length),
			)
		: -1;
	const waveActive = isResuming ? Math.round(progress * 42) : 18;

	return (
		<View style={[styles.root, { backgroundColor: Colors.light.cream }]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}>
				<View style={styles.coverWrap}>
					<Image
						source={{ uri: story.cover }}
						style={StyleSheet.absoluteFill}
						contentFit='cover'
					/>
					<View style={styles.coverFade} />
					<View style={styles.coverTopRow}>
						{kidMode ? (
							<View style={styles.kidModeBadge}>
								<Lock
									size={12}
									color={Colors.light.emeraldDeep}
								/>
								<Text style={styles.kidModeBadgeText}>
									وضع الطفل
								</Text>
							</View>
						) : (
							<Pressable
								onPress={onBack}
								style={styles.roundIconButton}>
								<ChevronRight
									size={18}
									color={Colors.light.emeraldDeep}
								/>
							</Pressable>
						)}
						{!kidMode && (
							<View style={styles.topActions}>
								<Pressable
									onPress={() => setKidMode(true)}
									style={styles.kidModeToggle}>
									<Baby
										size={15}
										color={Colors.light.emeraldDeep}
									/>
									<Text style={styles.kidModeToggleText}>
										وضع الطفل
									</Text>
								</Pressable>
								<Pressable style={styles.roundIconButton}>
									<Share2
										size={16}
										color={Colors.light.emeraldDeep}
									/>
								</Pressable>
								<Pressable
									onPress={() => setSaved((v) => !v)}
									style={styles.roundIconButton}>
									<Heart
										size={16}
										color={Colors.light.emeraldDeep}
										fill={
											saved
												? Colors.light.emeraldDeep
												: 'transparent'
										}
									/>
								</Pressable>
							</View>
						)}
					</View>
				</View>

				<View style={styles.metaSection}>
					<Text style={styles.storyTitle}>{story.titleAr}</Text>

					{!kidMode && (
						<View style={styles.metaRow}>
							<View style={styles.categoryPill}>
								<Text style={styles.categoryPillText}>
									{story.category}
								</Text>
							</View>
							<Text style={styles.metaDot}>·</Text>
							<Text style={styles.metaText}>
								{story.ageBand} سنوات
							</Text>
							<Text style={styles.metaDot}>·</Text>
							<Text style={styles.metaText}>
								{story.minutes} دقائق
							</Text>
						</View>
					)}

					<View style={styles.tabsRow}>
						{(['read', 'listen'] as const).map((t) => {
							const active = tab === t;
							return (
								<Pressable
									key={t}
									onPress={() => setTab(t)}
									style={[
										styles.tabButton,
										kidMode && styles.tabButtonKid,
										active && {
											backgroundColor:
												Colors.light.emeraldDeep,
										},
									]}>
									<Text
										style={[
											styles.tabButtonText,
											kidMode && styles.tabButtonTextKid,
											{
												color: active
													? Colors.light.goldSoft
													: Colors.light.emeraldDeep,
											},
										]}>
										{t === 'read' ? 'قراءة' : 'استماع'}
									</Text>
								</Pressable>
							);
						})}
					</View>
				</View>

				{isResuming && !kidMode && (
					<View style={styles.resumeSection}>
						<View style={styles.resumeCard}>
							<View style={styles.resumeIcon}>
								<RotateCcw
									size={16}
									color={Colors.light.emeraldDeep}
								/>
							</View>
							<View style={styles.resumeTextWrap}>
								<Text style={styles.resumeTitle}>
									استكمال من الدقيقة {fmt(elapsedSec)}
								</Text>
								<Text style={styles.resumeSubtitle}>
									توقّفتَ عند {Math.round(progress * 100)}٪ ·
									يتبقّى {Math.ceil(remainingSec / 60)} د
								</Text>
							</View>
							<Pressable
								onPress={() => setPlaying(true)}
								style={styles.resumeButton}>
								<Text style={styles.resumeButtonText}>
									متابعة
								</Text>
							</Pressable>
						</View>
					</View>
				)}

				{tab === 'read' && !kidMode && (
					<View style={styles.fontSwitchRow}>
						<Text style={styles.fontSwitchLabel}>نمط الخط</Text>
						<View style={styles.fontSwitchGroup}>
							{(
								[
									{
										id: true,
										label: 'سهل للأطفال',
										family: Fonts?.arabicEasy,
									},
									{
										id: false,
										label: 'خط تقليدي',
										family: Fonts?.arabicSerif,
									},
								] as const
							).map((o) => (
								<Pressable
									key={String(o.id)}
									onPress={() => setEasyFontPref(o.id)}
									style={[
										styles.fontSwitchOption,
										easyFont === o.id && {
											backgroundColor:
												Colors.light.emeraldDeep,
										},
									]}>
									<Text
										style={{
											fontFamily: o.family,
											fontSize: 11,
											fontWeight: '700',
											color:
												easyFont === o.id
													? Colors.light.goldSoft
													: Colors.light.emeraldDeep,
										}}>
										{o.label}
									</Text>
								</Pressable>
							))}
						</View>
					</View>
				)}

				{tab === 'read' ? (
					<View style={styles.article}>
						{paragraphs.map((text, i) => {
							const isCurrent = i === currentParagraph;
							return (
								<Text
									key={i}
									style={[
										i === 0
											? styles.paragraphFirst
											: styles.paragraphRest,
										{
											fontFamily: readerFontFamily,
											lineHeight: easyFont ? 44 : 38,
											backgroundColor: isCurrent
												? 'rgba(201,168,76,0.22)'
												: i === 0
													? 'transparent'
													: 'rgba(255,255,255,0.6)',
											borderRightWidth: isCurrent ? 3 : 0,
											borderRightColor: Colors.light.gold,
											paddingRight: isCurrent
												? 12
												: i === 0
													? 0
													: 16,
										},
									]}>
									{text}
								</Text>
							);
						})}
					</View>
				) : (
					<View style={styles.listenSection}>
						<View style={styles.playerCard}>
							<View style={styles.waveRow}>
								{Array.from({ length: 42 }).map((_, i) => {
									const active = i < waveActive;
									const h =
										20 + Math.abs(Math.sin(i * 1.3)) * 34;
									return (
										<View
											key={i}
											style={[
												styles.waveBar,
												{
													height: h,
													backgroundColor: active
														? Colors.light.gold
														: 'rgba(245,240,224,0.25)',
												},
											]}
										/>
									);
								})}
							</View>

							<View style={styles.timeRow}>
								<Text style={styles.timeText}>
									{fmt(elapsedSec)}
								</Text>
								<Text style={styles.timeText}>
									-{fmt(remainingSec)}
								</Text>
							</View>

							<View style={styles.controlsRow}>
								<Pressable style={{ opacity: 0.8 }}>
									<SkipForward
										size={22}
										color={Colors.light.cream}
									/>
								</Pressable>
								<Pressable
									onPress={() => setPlaying((v) => !v)}
									style={[
										styles.playButton,
										kidMode && styles.playButtonKid,
									]}>
									{playing ? (
										<Pause
											size={kidMode ? 40 : 26}
											fill={Colors.light.emeraldDeep}
											color={Colors.light.emeraldDeep}
										/>
									) : (
										<Play
											size={kidMode ? 40 : 26}
											fill={Colors.light.emeraldDeep}
											color={Colors.light.emeraldDeep}
										/>
									)}
								</Pressable>
								<Pressable style={{ opacity: 0.8 }}>
									<SkipBack
										size={22}
										color={Colors.light.cream}
									/>
								</Pressable>
							</View>

							{!kidMode && (
								<View style={styles.playerFooterRow}>
									<Pressable style={styles.playerFooterChip}>
										<Moon
											size={12}
											color={Colors.light.cream}
										/>
										<Text
											style={styles.playerFooterChipText}>
											مؤقّت النوم
										</Text>
									</Pressable>
									<Pressable style={styles.playerFooterChip}>
										<Text
											style={
												styles.playerFooterChipTextBold
											}>
											×1.0
										</Text>
									</Pressable>
								</View>
							)}
						</View>
						<Text style={styles.narratorNote}>
							راوٍ: الشيخ محمود · مدة التسجيل ٨ دقائق
						</Text>
					</View>
				)}

				{kidMode && (
					<View style={styles.kidModeFooter}>
						<View style={styles.kidModeFooterCard}>
							<Text style={styles.kidModeFooterText}>
								وضع الطفل مُفعّل: الإعدادات والمشاركة والبحث
								مقفلة أثناء القراءة.
							</Text>
							<HoldToUnlock
								label='اضغط مطوّلاً للخروج من وضع الطفل'
								doneLabel='تم الفتح'
								onComplete={() => setKidMode(false)}
							/>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1 },
	scrollContent: { paddingBottom: 40 },
	coverWrap: { height: 256, overflow: 'hidden' },
	coverFade: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'rgba(6,78,59,0.15)',
	},
	coverTopRow: {
		position: 'absolute',
		top: 12,
		left: 16,
		right: 16,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	kidModeBadge: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 6,
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: Colors.light.gold,
	},
	kidModeBadgeText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	roundIconButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.85)',
	},
	topActions: { flexDirection: 'row-reverse', gap: 8 },
	kidModeToggle: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 6,
		height: 36,
		borderRadius: 18,
		paddingHorizontal: 12,
		backgroundColor: 'rgba(255,255,255,0.85)',
	},
	kidModeToggleText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	metaSection: { marginTop: -32, paddingHorizontal: 20 },
	storyTitle: {
		fontSize: 30,
		lineHeight: 36,
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSerif,
		textAlign: 'right',
	},
	metaRow: {
		marginTop: 8,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 8,
	},
	categoryPill: {
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
		backgroundColor: 'rgba(6,78,59,0.1)',
	},
	categoryPillText: {
		fontSize: 11,
		fontWeight: '600',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
	},
	metaDot: { fontSize: 11, color: 'rgba(26,42,36,0.5)' },
	metaText: {
		fontSize: 11,
		color: 'rgba(26,42,36,0.7)',
		fontFamily: Fonts?.arabicSans,
	},
	tabsRow: {
		marginTop: 20,
		flexDirection: 'row',
		borderRadius: 999,
		padding: 4,
		backgroundColor: 'rgba(6,78,59,0.08)',
	},
	tabButton: {
		flex: 1,
		borderRadius: 999,
		paddingVertical: 8,
		alignItems: 'center',
	},
	tabButtonKid: { paddingVertical: 12 },
	tabButtonText: {
		fontSize: 12,
		fontWeight: '700',
		fontFamily: Fonts?.arabicSans,
	},
	tabButtonTextKid: { fontSize: 16 },
	resumeSection: { marginTop: 16, paddingHorizontal: 20 },
	resumeCard: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 12,
		borderRadius: 16,
		padding: 12,
		backgroundColor: 'rgba(201,168,76,0.18)',
		borderWidth: 1,
		borderColor: 'rgba(201,168,76,0.5)',
	},
	resumeIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.gold,
	},
	resumeTextWrap: { flex: 1 },
	resumeTitle: {
		fontSize: 13,
		fontWeight: '700',
		color: Colors.light.emeraldDeep,
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	resumeSubtitle: {
		marginTop: 2,
		fontSize: 11,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
		textAlign: 'right',
	},
	resumeButton: {
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: Colors.light.emeraldDeep,
	},
	resumeButtonText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.light.goldSoft,
		fontFamily: Fonts?.arabicSans,
	},
	fontSwitchRow: {
		marginTop: 16,
		paddingHorizontal: 20,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	fontSwitchLabel: {
		fontSize: 11,
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
	fontSwitchGroup: {
		flexDirection: 'row',
		borderRadius: 999,
		padding: 2,
		backgroundColor: 'rgba(6,78,59,0.08)',
	},
	fontSwitchOption: {
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	article: { marginTop: 20, paddingHorizontal: 20 },
	paragraphFirst: {
		fontSize: 19,
		color: Colors.light.ink,
		textAlign: 'right',
	},
	paragraphRest: {
		marginTop: 16,
		borderRadius: 16,
		padding: 16,
		fontSize: 17,
		color: 'rgba(26,42,36,0.85)',
		textAlign: 'right',
	},
	listenSection: { marginTop: 24, paddingHorizontal: 20 },
	playerCard: {
		borderRadius: 24,
		padding: 20,
		backgroundColor: Colors.light.emeraldDeep,
	},
	waveRow: {
		marginBottom: 16,
		height: 56,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		gap: 3,
	},
	waveBar: { width: 3, borderRadius: 999 },
	timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
	timeText: {
		fontSize: 11,
		opacity: 0.8,
		color: Colors.light.cream,
		fontFamily: Fonts?.sans,
	},
	controlsRow: {
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 24,
	},
	playButton: {
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.gold,
	},
	playButtonKid: { width: 96, height: 96, borderRadius: 48 },
	playerFooterRow: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	playerFooterChip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'rgba(255,255,255,0.1)',
	},
	playerFooterChipText: {
		fontSize: 12,
		color: Colors.light.cream,
		fontFamily: Fonts?.arabicSans,
	},
	playerFooterChipTextBold: {
		fontSize: 12,
		fontWeight: '700',
		color: Colors.light.cream,
	},
	narratorNote: {
		marginTop: 20,
		fontSize: 11,
		textAlign: 'center',
		color: 'rgba(26,42,36,0.5)',
		fontFamily: Fonts?.arabicSans,
	},
	kidModeFooter: { marginTop: 24, paddingHorizontal: 20, paddingBottom: 8 },
	kidModeFooterCard: {
		borderRadius: 16,
		padding: 12,
		alignItems: 'center',
		backgroundColor: 'rgba(6,78,59,0.06)',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: 'rgba(6,78,59,0.25)',
	},
	kidModeFooterText: {
		marginBottom: 8,
		fontSize: 11,
		lineHeight: 18,
		textAlign: 'center',
		color: 'rgba(26,42,36,0.6)',
		fontFamily: Fonts?.arabicSans,
	},
});
