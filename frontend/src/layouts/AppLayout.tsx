import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Sidebar } from "./Sidebar";
import { CategoryPills } from "../components/CategoryPills";

const categories = [
  "All",
  "Sugar",
  "Maize flour",
  "Salt",
  "Bread",
  "Tea leaves",
  "Toothpaste",
  "Bar soap",
  "Sanitary pads",
  "Wheat flour",
  "Detergents",
  "Tissue",
  "Coffee",
  "Cooking oil",
  "Milk",
  "Matchbox",
  "Rice",
  "Food additives",
];

export default function AppLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="w-full min-h-screen h-screen bg-teal-900 text-amber-300 relative overflow-hidden">
      {/* Background gradient or effects can go here if needed */}

      <div className="w-full h-full flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        <div className=" w-full grid grid-cols-[auto,1fr] flex-1 overflow-hidden pt-16">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="w-full overflow-y-auto overflow-x-hidden px-8 pb-4">
            <div className="sticky top-4 pt-4 z-40 pb-4 bg-teal-700 -mx-8 px-8">

              <div className="flex justify-center">
                <CategoryPills
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
            </div>

            {/* Nested route content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
