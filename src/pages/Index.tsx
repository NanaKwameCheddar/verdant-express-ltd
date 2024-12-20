import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StoreCard } from "@/components/StoreCard";
import { SearchBar } from "@/components/SearchBar";

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "Tasty Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    rating: 4.8,
    category: "American",
    deliveryTime: "20-30 min"
  },
  {
    id: 2,
    name: "Fresh Sushi Bar",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    rating: 4.9,
    category: "Japanese",
    deliveryTime: "25-35 min"
  },
  {
    id: 3,
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
    rating: 4.7,
    category: "Italian",
    deliveryTime: "30-40 min"
  }
];

export default function Index() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-6" />
          
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Hungry? We've got you covered</h1>
              <p className="text-lg text-muted-foreground">
                Order from your favorite restaurants and track your delivery in real-time
              </p>
            </div>

            <SearchBar />

            <section>
              <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <StoreCard key={store.id} {...store} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}