export const RULES = [
  "Test boshlangandan so'ng vaqt hisoblagich ishga tushadi va uni to'xtatib bo'lmaydi.",
  "Har bir savolda faqat bitta to'g'ri javob mavjud — A, B, C yoki D variantlaridan birini tanlang.",
  '"Oldingi" va "Keyingi" tugmalari orqali savollar orasida erkin harakatlanishingiz mumkin.',
  'Ishonchsiz savollarni "Belgilash" orqali belgilab, keyinroq qaytib javob berishingiz mumkin.',
  "Test faqat bitta qurilmada, bitta oynada ishlaydi — boshqa oyna yoki ilovaga o'tsangiz, test avtomatik yakunlanadi.",
  "Vaqt tugagach test avtomatik yopiladi, javob berilmagan savollar noto'g'ri hisoblanadi.",
  "Test davomida boshqa odam, kitob yoki internet manbalaridan foydalanish qat'iyan taqiqlanadi.",
  "Yakunlagach natijangiz — to'g'ri/noto'g'ri javoblar soni, foiz, ball va sarflangan vaqt — darhol ko'rsatiladi.",
];

export const FALLBACK_DURATION_SECONDS = 45; // ovozli o'qish qo'llab-quvvatlanmasa yoki ovoz o'chirilsa

export type PlaybackStatus = "idle" | "playing" | "paused" | "finished";
