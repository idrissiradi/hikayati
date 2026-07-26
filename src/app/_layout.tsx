import { Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';
import {
	Cairo_400Regular,
	Cairo_600SemiBold,
	Cairo_700Bold,
} from '@expo-google-fonts/cairo';
import { Lora_400Regular, Lora_600SemiBold } from '@expo-google-fonts/lora';
import {
	NunitoSans_400Regular,
	NunitoSans_600SemiBold,
	NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import {
	ReadexPro_400Regular,
	ReadexPro_600SemiBold,
} from '@expo-google-fonts/readex-pro';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { KidModeProvider } from '@/components/hikayati/kid-mode';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [fontsLoaded, fontError] = useFonts({
		Amiri_400Regular,
		Amiri_700Bold,
		Cairo_400Regular,
		Cairo_600SemiBold,
		Cairo_700Bold,
		Lora_400Regular,
		Lora_600SemiBold,
		NunitoSans_400Regular,
		NunitoSans_600SemiBold,
		NunitoSans_700Bold,
		ReadexPro_400Regular,
		ReadexPro_600SemiBold,
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<ThemeProvider
			value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<KidModeProvider>
				<AnimatedSplashOverlay />
				<Slot />
			</KidModeProvider>
		</ThemeProvider>
	);
}
