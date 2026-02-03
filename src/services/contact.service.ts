import { supabase } from '@/lib/api';
import { Contact, CreateContactInput, UpdateContactInput } from '@/types/contact';

// Contact service with CRUD operations
class ContactService {
  async getAll(): Promise<Contact[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async create(input: CreateContactInput): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update({ id, ...input }: UpdateContactInput): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async search(query: string): Promise<Contact[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const contactService = new ContactService();
