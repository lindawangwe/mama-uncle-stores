import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva([ "transition-color"], {
    variants:{
         variant:{
            default:["bg-secondary","hover:bg-secondary-hover","p-2"],
            secondary:["bg-teal-900 hover:bg-amber-100 text-amber-700"],
            ghost: ["hover:bg-amber-100"],
            dark:["bg-secondary-dark", "hover:bg-secondary-customDark","text-secondary"],
         },

         size:{
            default:[],
            sm:[
                "rounded-full",
                "w-15",
                "w-12",
                "h-12",
                "flex",
                "items-center",
                "p-2.5"

            ],
            md:[
                "rounded-border",
                "w-22",
                "h-12",
                "flex",
                "items-center",
                "p-2.5"

               ],
            icon:[
                "rounded-full",
                "w-12",
                "h-12",
                "flex",
                "items-center",
                "p-2.5"

                
            ],
            
       }
    },
    defaultVariants: {
        variant:"default",
        size:"default"
    }
}
)

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

export function Button ({variant,size,className, ...props}:ButtonProps){
    return (
    <button
        {...props}
        className={twMerge(buttonStyles({ variant, size }), className)} 
    />
    )
}
