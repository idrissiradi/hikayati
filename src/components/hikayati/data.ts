export type Story = {
	id: string;
	titleAr: string;
	titleEn: string;
	cover: string;
	category: string;
	ageBand: string;
	minutes: number;
	progress?: number;
	downloaded?: boolean;
	lastOpenedAr?: string;
	sizeMb?: number;
};

export const categories = [
	{ id: 'all', labelAr: 'الكل', labelEn: 'All' },
	{ id: 'prophets', labelAr: 'الأنبياء', labelEn: 'Prophets' },
	{ id: 'companions', labelAr: 'الصحابة', labelEn: 'Companions' },
	{ id: 'manners', labelAr: 'الأخلاق', labelEn: 'Manners' },
	{ id: 'hadith', labelAr: 'الأحاديث', labelEn: 'Hadith' },
];

export const stories: Story[] = [
	{
		id: '1',
		titleAr: 'ياسمين وقطعة الفازة المكسورة',
		titleEn: 'Yasmine and the Broken Vase',
		cover: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80',
		category: 'الأخلاق',
		ageBand: '6-8',
		minutes: 5,
		progress: 0,
	},
	{
		id: '2',
		titleAr: 'الرحمة بالحيوان',
		titleEn: 'Kindness to Animals',
		cover: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80',
		category: 'الأحاديث',
		ageBand: '3-5',
		minutes: 3,
		progress: 0.4,
		downloaded: true,
		lastOpenedAr: 'توقفت عند: سقاية الكلب العطشان',
		sizeMb: 8.1,
	},
	{
		id: '3',
		titleAr: 'صدق الصبي الصغير',
		titleEn: 'The Honest Little Boy',
		cover: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
		category: 'الأخلاق',
		ageBand: '6-8',
		minutes: 6,
		progress: 0.75,
		lastOpenedAr: 'توقفت عند: اعتراف الصبي لأمه',
	},
	{
		id: '4',
		titleAr: 'بر الوالدين',
		titleEn: 'Honoring Parents',
		cover: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80',
		category: 'الأحاديث',
		ageBand: '9-12',
		minutes: 7,
		progress: 1,
		downloaded: true,
		sizeMb: 12.4,
	},
	{
		id: '5',
		titleAr: 'قصة سيدنا يوسف',
		titleEn: 'The Story of Prophet Yusuf',
		cover: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&q=80',
		category: 'الأنبياء',
		ageBand: '9-12',
		minutes: 9,
		progress: 0,
	},
];
