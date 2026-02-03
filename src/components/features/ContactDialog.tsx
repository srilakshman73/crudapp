import { Contact } from '@/types/contact';
import { ContactForm } from './ContactForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ContactDialogProps {
  open: boolean;
  contact?: Contact;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export function ContactDialog({ open, contact, onClose, onSubmit, isSubmitting }: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{contact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          <DialogDescription>
            {contact ? 'Update contact information below.' : 'Fill in the details to create a new contact.'}
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          contact={contact}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
