import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from '@/pages/Dashboard';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
