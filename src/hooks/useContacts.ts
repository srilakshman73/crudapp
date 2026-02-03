import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '@/services/contact.service';
import { CreateContactInput, UpdateContactInput } from '@/types/contact';
import { toast } from 'sonner';

// React Query hooks for contact operations
export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactService.getAll(),
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateContactInput) => contactService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create contact');
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateContactInput) => contactService.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update contact');
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete contact');
    },
  });
}

export function useSearchContacts(query: string) {
  return useQuery({
    queryKey: ['contacts', 'search', query],
    queryFn: () => contactService.search(query),
    enabled: query.length > 0,
  });
}
