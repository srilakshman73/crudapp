// Type definitions for Contact entity
export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateContactInput extends CreateContactInput {
  id: string;
}
