import CategoryItem from "../components/CategoryItem";
import { categories } from "../data/Categories";


export default function HomePage (){
  return (
    <div className='w-full relative min-h-screen text-amber-200 overflow-hidden'>
      <div className='relative z-10  py-16'>

        <h1 className='text-center text-5xl sm:text-6xl font-bold text-amber-700 mb-4'>
          Essentials Made Easy
        </h1>
        <h2 className='text-center text-2xl text-amber-500 mb-12'>
          Quick Access To Your Daily Needs
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
      </div>
    </div>
  )
}

