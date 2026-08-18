const ALGORITHM = "AES-GCM";
const IV_LENGTH_BYTES = 12; // AES-GCM uchun standart va tavsiya etilgan uzunlik

let cachedKeyPromise: Promise<CryptoKey> | null = null;

function getSecretFromEnv(): string {
  const secret = import.meta.env.VITE_TOKEN_ENC_KEY;
  if (!secret || secret.length < 16) {
    throw new Error(
      "VITE_TOKEN_ENC_KEY topilmadi yoki juda qisqa. .env faylida kamida " +
        "32 belgili tasodifiy qiymat bo'lishi kerak (masalan: `openssl rand -base64 32`).",
    );
  }
  return secret;
}

// SECRET_KEY (matn) dan CryptoKey obyektini bir marta yasab, keshda saqlaymiz
function getKey(): Promise<CryptoKey> {
  if (cachedKeyPromise) return cachedKeyPromise;

  cachedKeyPromise = (async () => {
    const secret = getSecretFromEnv();
    const secretBytes = new TextEncoder().encode(secret);

    // Ixtiyoriy uzunlikdagi matnni AES uchun aniq 256-bitli kalitga tushiramiz
    const digest = await crypto.subtle.digest("SHA-256", secretBytes);

    return crypto.subtle.importKey("raw", digest, ALGORITHM, false, [
      "encrypt",
      "decrypt",
    ]);
  })();

  return cachedKeyPromise;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Matnni AES-GCM bilan shifrlaydi. Har chaqiriqda YANGI tasodifiy IV
 * ishlatiladi (AES-GCM'da IV takrorlanishi mumkin emas — xavfsizlikni
 * butunlay buzadi), shuning uchun bir xil matn har safar boshqacha
 * natija beradi.
 *
 * Qaytadigan qiymat: base64(iv + ciphertext) — bitta satr, localStorage'ga
 * to'g'ridan-to'g'ri yozsa bo'ladi.
 */
export async function encryptToken(plainText: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));
  const encoded = new TextEncoder().encode(plainText);

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded,
  );

  const combined = new Uint8Array(iv.length + cipherBuffer.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipherBuffer), iv.length);

  return toBase64(combined);
}

/**
 * encryptToken() natijasini asl matnga qaytaradi. Agar qiymat buzilgan,
 * eskirgan kalit bilan shifrlangan yoki boshqacha manipulyatsiya qilingan
 * bo'lsa — AES-GCM buni AVTOMATIK aniqlaydi (authenticated encryption) va
 * xato tashlaydi, shovqin qiymat qaytarmaydi.
 */
export async function decryptToken(cipherText: string): Promise<string> {
  const key = await getKey();
  const combined = fromBase64(cipherText);

  const iv = combined.slice(0, IV_LENGTH_BYTES);
  const data = combined.slice(IV_LENGTH_BYTES);

  const plainBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    data,
  );

  return new TextDecoder().decode(plainBuffer);
}
