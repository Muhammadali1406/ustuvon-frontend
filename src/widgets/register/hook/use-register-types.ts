
export type ContactMethod = "phone" | "email";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  email?: string;
}

export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  is_phone_verified: boolean;
  is_email_verified: boolean;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user: AuthUser;
  user_type: string;
}

// ---------------------------------------------------------------------------
// Forma holati
// ---------------------------------------------------------------------------

export type FormField =
  | "firstName"
  | "lastName"
  | "contactValue"
  | "password"
  | "confirmPassword";

export interface FormState {
  firstName: string;
  lastName: string;
  contactMethod: ContactMethod;
  contactValue: string;
  password: string;
  confirmPassword: string;
  errors: Partial<Record<FormField, string>>;
}

export type FormAction =
  | { type: "SET_FIELD"; field: FormField; value: string }
  | { type: "SET_CONTACT_METHOD"; method: ContactMethod }
  | { type: "SET_ERRORS"; errors: FormState["errors"] };