import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type CategoryPillsProp ={
categories: string[]
selectedCategory: string,
onSelect: (category:string) => void
}

const TRANSLATE_AMOUNT = 200

export function CategoryPills ({
    categories,
    selectedCategory,
    onSelect,
}:CategoryPillsProp){
    const [translate, setTranslate] =useState(0);
    const [isLeftVisible, setIsLeftVisible] =useState(false);
    const [isRightVisible, setIsRightVisible] =useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() =>{

        if(containerRef.current == null) return

        const observer = new ResizeObserver(entries =>{
            const container = entries[0]?.target//containerRef.current
            if (container == null) return

            setIsLeftVisible(translate>0)
            setIsRightVisible(
                translate + container.clientWidth < container.scrollWidth
            )

        })

        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }

    },[categories, translate])

    const handleCategorySelect = (category: string) => {
        onSelect(category);

        if (category === "All") {
            navigate("/");
        } else {
            const categoryPath = category.toLowerCase();
            navigate(`/category/${categoryPath}`);
        }
    }


return(
    <div ref={containerRef} className="overflow-x-hidden relative">
        <div
            className="flex whitespace-nowrap gap-3 
            transition-transform w-[max-content] mt-1"
            style={{transform:`translateX(-${translate}px)`}}>
            {categories.map(category=>(
                <Button
                key={category}
                onClick={()=>handleCategorySelect(category)}
                variant={selectedCategory === category ? "dark" : "default" }
                className={`
                    "py-1 px-2 rounded-lg whitespace-nowrap"
                    ${selectedCategory === category 
                      ? "text-amber-900 font-medium" 
                      : "text-amber-700 font-medium hover:text-amber-900"}

                `}
            >
                {category}
            </Button>
            
            ))}
            
        </div>
       {isLeftVisible && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-700 from-50% to-transparent w-24 h-full">
                <Button variant="ghost" 
                        size="icon" 
                        className="h-full aspect-square w-auto p-1.5"
                        onClick={() => {
                            setTranslate(translate => {
                                const newTranslate = translate - TRANSLATE_AMOUNT
                                if (newTranslate <= 0) return 0
                                return newTranslate
                            })
                        }}
                        >
                    <ChevronLeft />
                </Button>
            </div>
        ) }
        {isRightVisible && (
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 
                bg-gradient-to-l from-teal-700 from-50% to-transparent 
                w-24 h-full flex justify-end"
                onClick={() => {
                    setTranslate(translate => {
                        if(containerRef.current == null){
                            return translate
                        }
                        const newTranslate = translate + TRANSLATE_AMOUNT
                        const edge = containerRef.current.scrollWidth
                        const width = containerRef.current.clientWidth
                        if (newTranslate + width >= edge){
                            return edge - width
                        }
                        return newTranslate
                    })
                }}
                >
                <Button variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5">
                    <ChevronRight />
                </Button>
            </div>
        ) }

        
    </div>
    
)
}