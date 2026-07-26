import {
	BookOpen,
	Heart,
	Home,
	Lock,
	Search,
	Settings,
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useKidMode } from './kid-mode';
import type { Screen } from './types';

const tabs: {
	id: Screen;
	label: string;
	Icon: typeof Home;
	kidSafe: boolean;
}[] = [
	{ id: 'home', label: 'الرئيسية', Icon: Home, kidSafe: true },
	{ id: 'hadith', label: 'الحديث', Icon: BookOpen, kidSafe: true },
	{ id: 'search', label: 'بحث', Icon: Search, kidSafe: false },
	{ id: 'favorites', label: 'المفضلة', Icon: Heart, kidSafe: true },
	{ id: 'settings', label: 'الإعدادات', Icon: Settings, kidSafe: false },
];

export function BottomTabs({
	current,
	onChange,
}: Readonly<{
	current: Screen;
	onChange: (s: Screen) => void;
}>) {
	const { kidMode } = useKidMode();

	return (
		<View style={styles.nav}>
			{tabs.map(({ id, label, Icon, kidSafe }) => {
				const active = current === id;
				const locked = kidMode && !kidSafe;
				return (
					<Pressable
						key={id}
						onPress={() => !locked && onChange(id)}
						disabled={locked}
						style={[
							styles.tabButton,
							active && {
								backgroundColor: Colors.light.emeraldDeep,
							},
							locked && styles.tabButtonLocked,
						]}>
						<Icon
							size={18}
							strokeWidth={active ? 2.4 : 1.8}
							color={
								active
									? Colors.light.goldSoft
									: Colors.light.emeraldDeep
							}
						/>
						<Text
							style={[
								styles.tabLabel,
								{
									color: active
										? Colors.light.goldSoft
										: Colors.light.emeraldDeep,
								},
							]}>
							{label}
						</Text>
						{locked && (
							<View style={styles.lockBadge}>
								<Lock
									size={9}
									strokeWidth={2.5}
									color={Colors.light.emeraldDeep}
								/>
							</View>
						)}
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	nav: {
		position: 'absolute',
		left: 12,
		right: 12,
		bottom: 16,
		zIndex: 30,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 24,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.4)',
		backgroundColor: 'rgba(245,240,224,0.97)',
		paddingHorizontal: 8,
		paddingVertical: 8,

		shadowColor: '#064e3b',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.35,
		shadowRadius: 20,
		elevation: 8,
	},
	tabButton: {
		position: 'relative',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
		borderRadius: 16,
		paddingHorizontal: 4,
		paddingVertical: 6,
	},
	tabButtonLocked: {
		opacity: 0.35,
	},
	tabLabel: {
		fontSize: 10,
		fontFamily: Fonts?.arabicSans,
		fontWeight: '600',
	},
	lockBadge: {
		position: 'absolute',
		top: 2,
		left: 6,
	},
});
