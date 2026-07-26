import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabs } from '@/components/hikayati/BottomTabs';
import type { Story } from '@/components/hikayati/data';
import { FavoritesScreen } from '@/components/hikayati/FavoritesScreen';
import { HadithScreen } from '@/components/hikayati/HadithScreen';
import { HomeScreen } from '@/components/hikayati/HomeScreen';
import {
	OnboardingScreen,
	type OnboardingResult,
} from '@/components/hikayati/OnboardingScreen';
import { ReaderScreen } from '@/components/hikayati/ReaderScreen';
import { SearchScreen } from '@/components/hikayati/SearchScreen';
import { SettingsScreen } from '@/components/hikayati/SettingsScreen';
import type { Screen } from '@/components/hikayati/types';
import { Colors } from '@/constants/theme';

export default function RootScreen() {
	const [onboarded, setOnboarded] = useState(false);
	const [onboardingData, setOnboardingData] =
		useState<OnboardingResult | null>(null);
	const [screen, setScreen] = useState<Screen>('home');

	const [activeStory, setActiveStory] = useState<{
		story: Story;
		resumeFrom?: number;
	} | null>(null);

	const handleOnboardingDone = (result: OnboardingResult) => {
		setOnboardingData(result);
		setOnboarded(true);
	};

	const handleOpenStory = (story: Story, opts?: { resume?: boolean }) => {
		setActiveStory({
			story,
			resumeFrom: opts?.resume ? story.progress : undefined,
		});
		setScreen('reader');
	};

	const handleCloseReader = () => {
		setActiveStory(null);
		setScreen('home');
	};

	if (!onboarded) {
		return <OnboardingScreen onDone={handleOnboardingDone} />;
	}

	if (screen === 'reader' && activeStory) {
		return (
			<View style={styles.container}>
				<ReaderScreen
					story={activeStory.story}
					resumeFrom={activeStory.resumeFrom}
					onBack={handleCloseReader}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.safeArea} edges={['top']}>
				{screen === 'home' && (
					<HomeScreen onOpenStory={handleOpenStory} />
				)}
				{screen === 'hadith' && <HadithScreen />}
				{screen === 'search' && (
					<SearchScreen onOpenStory={handleOpenStory} />
				)}
				{screen === 'favorites' && (
					<FavoritesScreen onOpenStory={handleOpenStory} />
				)}
				{screen === 'settings' && <SettingsScreen />}
			</SafeAreaView>
			<BottomTabs current={screen} onChange={setScreen} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.cream,
	},
	safeArea: {
		flex: 1,
	},
});
