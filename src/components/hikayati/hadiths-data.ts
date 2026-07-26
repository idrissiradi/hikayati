export type Hadith = {
	id: string;
	topic: string;
	textAr: string;
	translationEn: string;
	source: 'Bukhari' | 'Muslim';
	narrator: string;
	appropriateness: string;
	contextGuidance?: string;
};

export const hadiths: Hadith[] = [
	{
		id: 'hadith-1',
		topic: `الرفق بالحيوان (نهي عن تعذيب قطة)`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ رضى الله عنهما، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "عُذِّبَتِ امْرَأَةٌ فِي هِرَّةٍ حَبَسَتْهَا، حَتَّى مَاتَتْ جُوعًا، فَدَخَلَتْ فِيهَا النَّارَ ـ قَالَ فَقَالَ وَاللَّهُ أَعْلَمُ ـ لاَ أَنْتِ أَطْعَمْتِهَا وَلاَ سَقَيْتِهَا حِينَ حَبَسْتِيهَا، وَلاَ أَنْتِ أَرْسَلْتِيهَا فَأَكَلَتْ مِنْ خَشَاشِ الأَرْضِ."`,
		translationEn: `Allah's Messenger (ﷺ) said, "A woman was tortured and was put in Hell because of a cat which she had kept locked till it died of hunger." Allah's Messenger (ﷺ) further said, (Allah knows better) Allah said (to the woman), 'You neither fed it nor watered when you locked it up, nor did you set it free to eat the vermin of the earth.' "`,
		source: 'Bukhari',
		narrator: `عَبْدِ اللَّهِ بْنِ عُمَرَ رضى الله عنهما`,
		appropriateness: 'يحتاج سياقًا',
		contextGuidance: `يُروى بأسلوب لطيف: التركيز على أن الحيوان له حق في الطعام والرعاية وليس على العقاب/النار مباشرة عند تقديمه لسن صغيرة جدًا؛ يمكن التركيز على نقيضه الإيجابي (قصة سقي الكلب) كمدخل أول قبل هذا الحديث.`,
	},
	{
		id: 'hadith-2',
		topic: `الصدق`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ وَمَا يَزَالُ الرَّجُلُ يَصْدُقُ وَيَتَحَرَّى الصِّدْقَ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ صِدِّيقًا وَإِيَّاكُمْ وَالْكَذِبَ فَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ وَمَا يَزَالُ الرَّجُلُ يَكْذِبُ وَيَتَحَرَّى الْكَذِبَ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ كَذَّابًا."`,
		translationEn: `It is obligatory for you to tell the truth, for truth leads to virtue and virtue leads to Paradise, and the man who continues to speak the truth and endeavours to tell the truth is eventually recorded as truthful with Allah, and beware of telling of a lie for telling of a lie leads to obscenity and obscenity leads to Hell-Fire, and the person who keeps telling lies and endeavours to tell a lie is recorded as a liar with Allah.`,
		source: 'Muslim',
		narrator: `عَبْدِ اللَّهِ بْنِ مَسْعُودٍ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-3',
		topic: `الكذب من صفات المنافق`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "آيَةُ الْمُنَافِقِ ثَلاَثٌ إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ."`,
		translationEn: `The Prophet (ﷺ) said, "The signs of a hypocrite are three:


     1. Whenever he speaks, he tells a lie.


     2. Whenever he promises, he always breaks it (his promise ).


     3. If you trust him, he proves to be dishonest. (If you keep something
     as a trust with him, he will not return it.)"`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-4',
		topic: `حب الخير للناس`,
		textAr: `عَنْ أَنَسٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ."`,
		translationEn: `The Prophet (ﷺ) said, "None of you will have faith till he wishes for his 
     (Muslim) brother what he likes for himself."`,
		source: 'Bukhari',
		narrator: `أَنَسٍ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-5',
		topic: `النظافة من الإيمان`,
		textAr: `عَنْ أَبِي مَالِكٍ الأَشْعَرِيِّ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "الطُّهُورُ شَطْرُ الإِيمَانِ وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ - أَوْ تَمْلأُ - مَا بَيْنَ السَّمَوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا."`,
		translationEn: `The Messenger of Allah (ﷺ) said: Cleanliness is half of faith and al-Hamdu Lillah (all praise and gratitude is for Allah alone) fills the scale, and Subhan Allah (Glory be to Allah) and al-Hamdu Lillah fill up what is between the heavens and the earth, and prayer is a light, and charity is proof (of one's faith) and endurance is a brightness and the Holy Qur'an is a proof on your behalf or against you. All men go out early in the morning and sell themselves, thereby setting themselves free or destroying themselves.`,
		source: 'Muslim',
		narrator: `أَبِي مَالِكٍ الأَشْعَرِيِّ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-6',
		topic: `قول الخير أو الصمت`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلاَ يُؤْذِ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ."`,
		translationEn: `Allah's Messenger (ﷺ) said, "Anybody who believes in Allah and the Last Day should not harm his neighbor, 
and anybody who believes in Allah and the Last Day should entertain his guest generously and 
anybody who believes in Allah and the Last Day should talk what is good or keep quiet. (i.e. abstain 
from all kinds of evil and dirty talk).`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-7',
		topic: `المسلم من سلم الناس من لسانه ويده`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رضى الله عنهما، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ."`,
		translationEn: `The Prophet (ﷺ) said, "A Muslim is the one who avoids harming Muslims with
     his tongue and hands. And a Muhajir (emigrant) is the one who gives up
     (abandons) all what Allah has forbidden."`,
		source: 'Bukhari',
		narrator: `عَبْدِ اللَّهِ بْنِ عَمْرٍو رضى الله عنهما`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-8',
		topic: `التبسم والبشاشة`,
		textAr: `عَنْ أَبِي ذَرٍّ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لاَ تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ."`,
		translationEn: `Allah's Apostle (ﷺ) said to me: Don't consider anything insignificant out of good things even if it is that you meet your brother with a cheerful countenance.`,
		source: 'Muslim',
		narrator: `أَبِي ذَرٍّ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-9',
		topic: `الصدقة (حتى بالكلمة الطيبة)`,
		textAr: `عَنْ جَابِرِ بْنِ عَبْدِ اللَّهِ رضى الله عنهما، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "كُلُّ مَعْرُوفٍ صَدَقَةٌ."`,
		translationEn: `The Prophet (ﷺ) said, Enjoining, all that is good is a Sadaqa."`,
		source: 'Bukhari',
		narrator: `جَابِرِ بْنِ عَبْدِ اللَّهِ رضى الله عنهما`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-10',
		topic: `تشميت العاطس وحقوق المسلم`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "حَقُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ خَمْسٌ: رَدُّ السَّلاَمِ، وَعِيَادَةُ الْمَرِيضِ، وَاتِّبَاعُ الْجَنَائِزِ، وَإِجَابَةُ الدَّعْوَةِ، وَتَشْمِيتُ الْعَاطِسِ."`,
		translationEn: `I heard Allah's Messenger (ﷺ) saying, "The rights of a Muslim on the Muslims are five: to respond to the salaam, visiting the sick, to follow the funeral processions, to accept an invitation, and to reply to those who sneeze. (see Hadith 1239)`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-11',
		topic: `زيارة المريض`,
		textAr: `عَنْ أَبِي مُوسَى، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "فُكُّوا الْعَانِيَ ـ يَعْنِي الأَسِيرَ ـ وَأَطْعِمُوا الْجَائِعَ وَعُودُوا الْمَرِيضَ."`,
		translationEn: `The Prophet (ﷺ) said, "Free the captives, feed the hungry and pay a visit to the sick."`,
		source: 'Bukhari',
		narrator: `أَبِي مُوسَى`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-12',
		topic: `غرس الأشجار وصدقتها الجارية`,
		textAr: `عَنْ أَنَسٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ."`,
		translationEn: `Allah's Messenger (ﷺ) said, "There is none amongst the Muslims who plants a tree or sows seeds, and then a 
bird, or a person or an animal eats from it, but is regarded as a charitable gift for him."`,
		source: 'Bukhari',
		narrator: `أَنَسٍ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-13',
		topic: `التعاون والتراحم بين المؤمنين`,
		textAr: `عَنْ النُّعْمَانِ بْنِ بَشِيرٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ، إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى."`,
		translationEn: `The similitude of believers in regard to mutual love, affection, fellow-feeling is that of one body; when any limb of it aches, the whole body aches, because of sleeplessness and fever.`,
		source: 'Muslim',
		narrator: `النُّعْمَانِ بْنِ بَشِيرٍ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-14',
		topic: `صلة الرحم`,
		textAr: `عَنْ أَنَسِ بْنِ مَالِكٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ، وَيُنْسَأَ لَهُ فِي أَثَرِهِ، فَلْيَصِلْ رَحِمَهُ."`,
		translationEn: `Allah 's Apostle said, "Whoever loves that he be granted more wealth and that his lease of life be 
prolonged then he should keep good relations with his Kith and kin."`,
		source: 'Bukhari',
		narrator: `أَنَسِ بْنِ مَالِكٍ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-15',
		topic: `الأعمال بالنيات`,
		textAr: `عَنْ عُمَرَ بْنِ الْخَطَّابِ رضي الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ."`,
		translationEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the 
     intentions and every person will get the reward according to what he 
     has intended. So whoever emigrated for worldly benefits or for a woman
     to marry, his emigration was for what he emigrated for."`,
		source: 'Bukhari',
		narrator: `عُمَرَ بْنِ الْخَطَّابِ رضي الله عنه`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-16',
		topic: `أركان الإسلام`,
		textAr: `عَنْ ابْنِ عُمَرَ رضى الله عنهما، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ."`,
		translationEn: `Allah's Messenger (ﷺ) said: Islam is based on (the following) five 
     (principles):


     1. To testify that none has the right to be worshipped but Allah and 
     Muhammad is Allah's Messenger (ﷺ).


     2. To offer the (compulsory congregational) prayers dutifully and 
     perfectly.


     3. To pay Zakat (i.e. obligatory charity) .


     4. To perform Hajj. (i.e. Pilgrimage to Mecca)


     5. To observe fast during the month of Ramadan.`,
		source: 'Bukhari',
		narrator: `ابْنِ عُمَرَ رضى الله عنهما`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-17',
		topic: `التسمية عند الأكل والأكل باليمين`,
		textAr: `عَنْ عُمَرَ بْنِ أَبِي سَلَمَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "كُنْتُ فِي حَجْرِ رَسُولِ اللَّهِ صلى الله عليه وسلم وَكَانَتْ يَدِي تَطِيشُ فِي الصَّحْفَةِ، فَقَالَ لِي: "يَا غُلاَمُ سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ"."`,
		translationEn: `I was under the care of Allah's Messenger (way peace be upon him), and as my hand used to roam about in the dish he said to me: Boy, mention the name of Allah, and eat with your right hand and eat from what is near to you.`,
		source: 'Muslim',
		narrator: `عُمَرَ بْنِ أَبِي سَلَمَةَ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-18',
		topic: `المؤمن لا يلدغ من جحر مرتين`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لاَ يُلْدَغُ الْمُؤْمِنُ مِنْ جُحْرٍ وَاحِدٍ مَرَّتَيْنِ."`,
		translationEn: `The Prophet (ﷺ) said, "A believer is not stung twice (by something) out of one and the same hole."`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-19',
		topic: `إفشاء السلام وإطعام الطعام`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو: "أَنَّ رَجُلاً سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم: أَىُّ الإِسْلاَمِ خَيْرٌ؟ قَالَ: ‘تُطْعِمُ الطَّعَامَ وَتَقْرَأُ السَّلاَمَ عَلَى مَنْ عَرَفْتَ وَمَنْ لَمْ تَعْرِفْ’."`,
		translationEn: `That you provide food and extend greetings to one whom you know or do not know.`,
		source: 'Muslim',
		narrator: `عَبْدِ اللَّهِ بْنِ عَمْرٍو`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-20',
		topic: `حسن الخلق`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لَمْ يَكُنِ النَّبِيُّ صلى الله عليه وسلم فَاحِشًا وَلاَ مُتَفَحِّشًا، وَكَانَ يَقُولُ: "إِنَّ مِنْ خِيَارِكُمْ أَحَاسِنَكُمْ أَخْلاَقًا"."`,
		translationEn: `We went to Abdullah b. 'Amr when Mu'dwiya came to Kufa, and he made a mention of Allah's Messenger (ﷺ) and said: He was never immoderate in his talk and he never reviled others. Allah's Messenger (ﷺ) also said: The best amongst you are those who are best in morals. Uthman said: When he came to Kufa along with Mu'awiya... (The rest of the hadith is the same).`,
		source: 'Muslim',
		narrator: `عَبْدِ اللَّهِ بْنِ عَمْرٍو`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-21',
		topic: `لا تباغضوا ولا تحاسدوا`,
		textAr: `عَنْ أَنَسِ بْنِ مَالِكٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لاَ تَبَاغَضُوا وَلاَ تَحَاسَدُوا وَلاَ تَدَابَرُوا وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا، وَلاَ يَحِلُّ لِمُسْلِمٍ أَنْ يَهْجُرَ أَخَاهُ فَوْقَ ثَلاَثٍ."`,
		translationEn: `Neither nurse mutual hatred, nor jealousy, nor enmity, and become as fellow brothers and servants of Allah. It is not lawful for a Muslim that he should keep his relations estranged with his brother beyond three days.`,
		source: 'Muslim',
		narrator: `أَنَسِ بْنِ مَالِكٍ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-22',
		topic: `تشبيك الأيدي (تعاون المؤمنين)`,
		textAr: `عَنْ أَبِي مُوسَى، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا. وَشَبَّكَ أَصَابِعَهُ."`,
		translationEn: `The Prophet (ﷺ) said, "A faithful believer to a faithful believer is like the bricks of a wall, enforcing each 
other." While (saying that) the Prophet (ﷺ) clasped his hands, by interlacing his fingers.`,
		source: 'Bukhari',
		narrator: `أَبِي مُوسَى`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-23',
		topic: `تحريم الغيبة`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "أَتَدْرُونَ مَا الْغِيبَةُ؟ قَالُوا: اللَّهُ وَرَسُولُهُ أَعْلَمُ. قَالَ: "ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ". قِيلَ: أَفَرَأَيْتَ إِنْ كَانَ فِي أَخِي مَا أَقُولُ؟ قَالَ: "إِنْ كَانَ فِيهِ مَا تَقُولُ فَقَدِ اغْتَبْتَهُ، وَإِنْ لَمْ يَكُنْ فِيهِ فَقَدْ بَهَتَّهُ"."`,
		translationEn: `Do you know what is backbiting? They (the Companions) said: Allah and His Messenger know best. Thereupon he (the Holy Prophet) said: Backbiting implies your talking about your brother in a manner which he does not like. It was said to him: What is your opinion about this that if I actually find (that failing) in my brother which I made a mention of? He said: If (that failing) is actually found (in him) what you assert, you in fact backbited him, and if that is not in him it is a slander.`,
		source: 'Muslim',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-24',
		topic: `تأثير الأصدقاء (حامل المسك ونافخ الكير)`,
		textAr: `عَنْ أَبِي مُوسَى رضى الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَثَلُ الْجَلِيسِ الصَّالِحِ وَالسَّوْءِ كَحَامِلِ الْمِسْكِ وَنَافِخِ الْكِيرِ، فَحَامِلُ الْمِسْكِ إِمَّا أَنْ يُحْذِيَكَ، وَإِمَّا أَنْ تَبْتَاعَ مِنْهُ، وَإِمَّا أَنْ تَجِدَ مِنْهُ رِيحًا طَيِّبَةً، وَنَافِخُ الْكِيرِ إِمَّا أَنْ يُحْرِقَ ثِيَابَكَ، وَإِمَّا أَنْ تَجِدَ رِيحًا خَبِيثَةً."`,
		translationEn: `The Prophet (ﷺ) said, 'The example of a good pious companion and an evil one is that of a person carrying 
musk and another blowing a pair of bellows. The one who is carrying musk will either give you some 
perfume as a present, or you will buy some from him, or you will get a good smell from him, but the 
one who is blowing a pair of bellows will either burn your clothes or you will get a bad smell from 
him."`,
		source: 'Bukhari',
		narrator: `أَبِي مُوسَى رضى الله عنه`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-25',
		topic: `من رأى منكم منكرًا`,
		textAr: `عَنْ أَبِي سَعِيدٍ الْخُدْرِيِّ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ، وَذَلِكَ أَضْعَفُ الإِيمَانِ."`,
		translationEn: `It was Marwan who initiated (the practice) of delivering khutbah (address) before the prayer on the 'Id day. A man stood up and said: Prayer should precede khutbah. He (Marwan) remarked, This (practice) has been done away with. Upon this Abu Sa'id remarked: This man has performed (his duty) laid on him. I heard the Messenger of Allah as saying: He who amongst you sees something abominable should modify it with the help of his hand; and if he has not strength enough to do it, then he should do it with his tongue, and if he has not strength enough to do it, (even) then he should (abhor it) from his heart, and that is the least of faith.`,
		source: 'Muslim',
		narrator: `أَبِي سَعِيدٍ الْخُدْرِيِّ`,
		appropriateness: 'يحتاج سياقًا',
		contextGuidance: `مفهوم "إنكار المنكر باليد" يحتاج تبسيطًا شديدًا لسن الطفل: يُترجم إلى "قل لصديقك بلطف إن كان يفعل شيئًا خاطئًا" بدل أي معنى يوحي بالتدخل الجسدي أو السلطة.`,
	},
	{
		id: 'hadith-26',
		topic: `أحق الناس بحسن الصحبة (الأم ثلاثًا)`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ: "جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالَ: مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: ‘أُمُّكَ’. قَالَ: ثُمَّ مَنْ؟ قَالَ: ‘ثُمَّ أُمُّكَ’. قَالَ: ثُمَّ مَنْ؟ قَالَ: ‘ثُمَّ أُمُّكَ’. قَالَ: ثُمَّ مَنْ؟ قَالَ: ‘ثُمَّ أَبُوكَ’."`,
		translationEn: `Who among the people is most deserving of a fine treatment from my hand? He said: Your mother. He again said: Then who (is the next one)? He said: Again it is your mother (who deserves the best treatment from you). He said: Then who (is the next one)? He (the Holy Prophet) said: Again, it is your mother. He (again) said: Then who? Thereupon he said: Then it is your father. In the hadith transmitted on the authority of Qutalba, there is no mention of the word" the people".`,
		source: 'Muslim',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-27',
		topic: `الله لا ينظر إلى صوركم`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى أَجْسَادِكُمْ وَلاَ إِلَى صُوَرِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ. وَأَشَارَ بِأَصَابِعِهِ إِلَى صَدْرِهِ."`,
		translationEn: `" Verily Allah does not look to your bodies nor to your faces but He looks to your hearts," and he pointed towards the heart with his fingers.`,
		source: 'Muslim',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-28',
		topic: `خيركم من تعلم القرآن وعلمه`,
		textAr: `عَنْ عُثْمَانَ رضى الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ."`,
		translationEn: `The Prophet (ﷺ) said, "The best among you (Muslims) are those who learn the Qur'an and teach it."`,
		source: 'Bukhari',
		narrator: `عُثْمَانَ رضى الله عنه`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-29',
		topic: `حب النبي أكثر من كل شيء`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ رضى الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "فَوَالَّذِي نَفْسِي بِيَدِهِ لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ."`,
		translationEn: `"Allah's Messenger (ﷺ) said, "By Him in Whose Hands my life is, none of you 
     will have faith till he loves me more than his father and his 
     children."`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ رضى الله عنه`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-30',
		topic: `الله جميل يحب الجمال`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لاَ يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ. قَالَ رَجُلٌ: إِنَّ الرَّجُلَ يُحِبُّ أَنْ يَكُونَ ثَوْبُهُ حَسَنًا وَنَعْلُهُ حَسَنَةً. قَالَ: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ، الْكِبْرُ بَطَرُ الْحَقِّ وَغَمْطُ النَّاسِ"."`,
		translationEn: `He who has in his heart the weight of a mustard seed of pride shall not enter Paradise. A person (amongst his hearers) said: Verily a person loves that his dress should be fine, and his shoes should be fine. He (the Holy Prophet) remarked: Verily, Allah is Graceful and He loves Grace. Pride is disdaining the truth (out of self-conceit) and contempt for the people.`,
		source: 'Muslim',
		narrator: `عَبْدِ اللَّهِ بْنِ مَسْعُودٍ`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-31',
		topic: `من صام رمضان إيمانًا واحتسابًا`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ."`,
		translationEn: `Allah's Messenger (ﷺ) said, "Whoever observes fasts during the month of 
     Ramadan out of sincere faith, and hoping to attain Allah's rewards, 
     then all his past sins will be forgiven."`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-32',
		topic: `صلة أهل ود الأب بعد وفاته`,
		textAr: `عَنْ ابْنِ عُمَرَ: "كَانَ ابْنُ عُمَرَ إِذَا خَرَجَ إِلَى مَكَّةَ كَانَ لَهُ حِمَارٌ يَتَرَوَّحُ عَلَيْهِ إِذَا مَلَّ رُكُوبَ الرَّاحِلَةِ، وَعِمَامَةٌ يَشُدُّ بِهَا رَأْسَهُ، فَبَيْنَا هُوَ يَوْمًا عَلَى ذَلِكَ الْحِمَارِ إِذْ مَرَّ بِهِ أَعْرَابِيٌّ فَقَالَ: أَلَسْتَ ابْنَ فُلاَنِ بْنِ فُلاَنٍ؟ قَالَ: بَلَى. فَأَعْطَاهُ الْحِمَارَ وَقَالَ: ارْكَبْ هَذَا، وَالْعِمَامَةَ، اشْدُدْ بِهَا رَأْسَكَ. فَقَالَ لَهُ بَعْضُ أَصْحَابِهِ: غَفَرَ اللَّهُ لَكَ، أَعْطَيْتَ هَذَا الأَعْرَابِيَّ حِمَارًا كُنْتَ تَرَوَّحُ عَلَيْهِ وَعِمَامَةً كُنْتَ تَشُدُّ بِهَا رَأْسَكَ! فَقَالَ: إِنِّي سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ: "إِنَّ مِنْ أَبَرِّ الْبِرِّ صِلَةَ الرَّجُلِ أَهْلَ وُدِّ أَبِيهِ بَعْدَ أَنْ يُوَلِّيَ". وَإِنَّ أَبَاهُ كَانَ صَدِيقًا لِعُمَرَ."`,
		translationEn: `Arn't you so and so? He said: Yes He gave him his donkey and said: Ride it, and tie the turban round your head. Some of his companions said: May Allah pardon you, you gave to this desert Arab the donkey on which you enjoyed ride for diversion and the turban which you tied round your. head. Thereupon he said: Verily I heard Allah's Messenger (ﷺ) as saying: The finest act of goodness is the kind treatment of a person to the loved ones of his father after his death and the father of this person was a friend of 'Umar.`,
		source: 'Muslim',
		narrator: `ابْنِ عُمَرَ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-33',
		topic: `في كل ذات كبد رطبة أجر`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ رضى الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "بَيْنَا رَجُلٌ بِطَرِيقٍ، اشْتَدَّ عَلَيْهِ الْعَطَشُ فَوَجَدَ بِئْرًا فَنَزَلَ فِيهَا فَشَرِبَ، ثُمَّ خَرَجَ، فَإِذَا كَلْبٌ يَلْهَثُ يَأْكُلُ الثَّرَى مِنَ الْعَطَشِ، فَقَالَ الرَّجُلُ: لَقَدْ بَلَغَ هَذَا الْكَلْبَ مِنَ الْعَطَشِ مِثْلُ الَّذِي كَانَ بَلَغَ مِنِّي. فَنَزَلَ الْبِئْرَ، فَمَلأَ خُفَّهُ مَاءً، فَسَقَى الْكَلْبَ، فَشَكَرَ اللَّهُ لَهُ، فَغَفَرَ لَهُ. قَالُوا: يَا رَسُولَ اللَّهِ وَإِنَّ لَنَا فِي الْبَهَائِمِ لأَجْرًا؟ فَقَالَ: "فِي كُلِّ ذَاتِ كَبِدٍ رَطْبَةٍ أَجْرٌ"."`,
		translationEn: `The Prophet (ﷺ) said, "A man felt very thirsty while he was on the way, there he came across a well. He 
went down the well, quenched his thirst and came out. Meanwhile he saw a dog panting and licking 
mud because of excessive thirst. He said to himself, "This dog is suffering from thirst as I did." So, he 
went down the well again and filled his shoe with water and watered it. Allah thanked him for that 
deed and forgave him. The people said, "O Allah's Messenger (ﷺ)! Is there a reward for us in serving the 
animals?" He replied: "Yes, there is a reward for serving any animate (living being)." (See Hadith No. 
551)`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ رضى الله عنه`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-34',
		topic: `المسلم أخو المسلم لا يظلمه ولا يسلمه`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ، مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ بِهَا كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ."`,
		translationEn: `A Muslim is the brother of a fellow-Muslim. He should neither commit oppression upon him nor ruin him, and he who meets the need of a brot'ier, Allah would meet big needs, and he who relieved a Muslim from hardship Allah would relieve him from the hardships to which he would be put on the Day of Resurrection, and he who did not expose (the follies of a Muslim) Allah would conceal his follies on the Day of Resurrection.`,
		source: 'Muslim',
		narrator: `عَبْدِ اللَّهِ بْنِ عُمَرَ`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-35',
		topic: `الحياء شعبة من الإيمان`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ رضى الله عنه، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ."`,
		translationEn: `The Prophet (ﷺ) said, "Faith (Belief) consists of more than sixty branches
     (i.e. parts). And Haya (This term "Haya" covers a large number of 
     concepts which are to be taken together; amongst them are self 
     respect, modesty, bashfulness, and scruple, etc.) is a part of 
     faith."`,
		source: 'Bukhari',
		narrator: `أَبِي هُرَيْرَةَ رضى الله عنه`,
		appropriateness: 'مناسب',
	},
	{
		id: 'hadith-36',
		topic: `خيركم أحسنكم أخلاقا`,
		textAr: `عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رضى الله عنهما، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لَمْ يَكُنِ النَّبِيُّ صلى الله عليه وسلم فَاحِشًا وَلاَ مُتَفَحِّشًا وَكَانَ يَقُولُ: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلاَقًا"."`,
		translationEn: `The Prophet (ﷺ) never used bad language neither a "Fahish nor a Mutafahish. He used to say "The best 
amongst you are those who have the best manners and character." (See Hadith No. 56 (B) Vol. 8)`,
		source: 'Bukhari',
		narrator: `عَبْدِ اللَّهِ بْنِ عَمْرٍو رضى الله عنهما`,
		appropriateness: 'مناسب جدًا',
	},
	{
		id: 'hadith-37',
		topic: `ليس الشديد بالصرعة`,
		textAr: `عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ."`,
		translationEn: `The strong-man is not one who wrestles well but the strong man is one who controls himself when he is in a fit of rage.`,
		source: 'Muslim',
		narrator: `أَبِي هُرَيْرَةَ`,
		appropriateness: 'مناسب جدًا',
	},
];
