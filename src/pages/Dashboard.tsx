import { useState } from 'react';
import { useContacts, useCreateContact, useUpdateContact, useDeleteContact } from '@/hooks/useContacts';
import { Contact } from '@/types/contact';
import { ContactDialog } from '@/components/features/ContactDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Pencil, Trash2, Mail, Phone, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: contacts = [], isLoading } = useContacts();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  const filteredContacts = searchQuery
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.includes(searchQuery)
      )
    : contacts;

  const handleAddNew = () => {
    setSelectedContact(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteContactId(id);
  };

  const confirmDelete = () => {
    if (deleteContactId) {
      deleteMutation.mutate(deleteContactId);
      setDeleteContactId(null);
    }
  };

  const handleSubmit = async (data: any) => {
    if (selectedContact) {
      await updateMutation.mutateAsync({ id: selectedContact.id, ...data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Contact Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-indigo-100">Contacts</span>
              <Button
                onClick={handleAddNew}
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Table Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Contact List</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Total: <span className="font-semibold text-indigo-600">{filteredContacts.length}</span>
                </p>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading contacts...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-12 text-center">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchQuery ? 'No contacts found' : 'No contacts yet. Add your first contact!'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">NAME</TableHead>
                  <TableHead className="font-semibold text-gray-700">EMAIL</TableHead>
                  <TableHead className="font-semibold text-gray-700">PHONE</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-indigo-600" />
                        </div>
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {contact.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(contact)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(contact.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDialog
        open={dialogOpen}
        contact={selectedContact}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteContactId} onOpenChange={() => setDeleteContactId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
