import { ComponentPropsWithoutRef } from "react";

export interface WrapperCardProps extends ComponentPropsWithoutRef<'div'>  {
    children: ReactNode;
    className?: string; 
}