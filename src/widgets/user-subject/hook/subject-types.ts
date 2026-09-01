// Backend GET /subjects/taxanomy-tree/ haqiqiy javobiga mos.
// Bu sahifada faqat 2 qatlam ishlatiladi: Category va Subject.
// Module/Topic tiplari ham aniq yozildi (kelajakda kerak bo'lishi mumkin),
// lekin UserSubjects sahifasi ularni ishlatmaydi.

export interface Topic {
  id: number;
  title: string;
  order: number;
}

export interface Module {
  id: number;
  title: string;
  order: number;
  topics: Topic[];
}

export interface Subject {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

export interface Category {
  id: number;
  title: string;
  subjects: Subject[];
}

// UserSubjects sahifasida ishlatish uchun — bitta fan + uning qaysi
// kategoriyaga tegishli ekanini birga saqlaydi (API'da subject o'zi
// категория nomini bilmaydi, faqat daraxt ichida joylashgan)
export interface FlatSubject extends Subject {
  categoryId: number;
  categoryTitle: string;
}