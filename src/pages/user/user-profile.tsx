import Header from "@/widgets/user-profile/ui/header";
import StatUserProfile from "@/widgets/user-profile/ui/stats-user-profile";
import PersonalInfo from "@/widgets/user-profile/ui/personal-info";
import SertificateUserProfile from "@/widgets/user-profile/ui/user-sertificate";
import Password from "@/widgets/user-profile/ui/password";
import { useAuthStore } from "@/components/zustand/auth-info";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

export default function UserProfile() {
  const user = useAuthStore((state) => state.user);

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
      <PersonalInfo DEMO_USER={user || DEMO_USER} />

      {/* Certificates */}
      <SertificateUserProfile />

      {/* Security — change password */}
      <Password />
    </div>
  );
}
