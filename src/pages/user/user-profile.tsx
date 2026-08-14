import Header from "@/widgets/user-profile/ui/header";
import StatUserProfile from "@/widgets/user-profile/ui/stats-user-profile";
import PersonalInfo from "@/widgets/user-profile/ui/personal-info";
import SertificateUserProfile from "@/widgets/user-profile/ui/user-sertificate";
import Password from "@/widgets/user-profile/ui/password";

export default function UserProfile() {
  // Parolni yangilash — 2 bosqichli (forma -> SMS/email kod tasdiqlash)

  // Sertifikatlar — 85%+ natijaga ega har bir fandagi eng yaxshi urinish

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Profil</h1>
        <p className="mt-1 text-sm text-slate-500">
          Shaxsiy ma'lumotlaringiz va statistikangiz
        </p>
      </div>

      {/* Profile header card */}
      <Header />

      {/* Stats */}
      <StatUserProfile />

      {/* Personal info */}
      <PersonalInfo />

      {/* Certificates */}
      <SertificateUserProfile />

      {/* Security — change password */}
      <Password />
    </div>
  );
}
