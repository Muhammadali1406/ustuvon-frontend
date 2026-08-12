import { QuickActionCard } from "./activity-confident-quick-metric";
import { BookOpen, Sparkles, UsersIcon } from "lucide-react";

export default function QuickAction() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <QuickActionCard
        to="/admin/tests"
        title="Yangi test yaratish"
        description="Fayl yuklang, AI avtomatik formatlaydi"
        icon={<Sparkles size={19} />}
      />
      <QuickActionCard
        to="/admin/subjects"
        title="Fan qo'shish"
        description="Yangi fan yoki bo'lim yaratish"
        icon={<BookOpen size={19} />}
      />
      <QuickActionCard
        to="/admin/users"
        title="Foydalanuvchilarni ko'rish"
        description="Ro'yxat, faollik va holatni boshqarish"
        icon={<UsersIcon size={19} />}
      />
    </div>
  );
}
