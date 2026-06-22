import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Slot-implementation (likt @radix-ui/react-slot) som låter en
 * komponent rendera sitt enda barn och slå ihop props/className. Används för
 * `asChild`-mönstret på Button utan extra beroenden.
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;

    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = child.props;

    return React.cloneElement(child, {
      ...props,
      ...childProps,
      ref,
      className: cn(className, childProps.className as string | undefined),
    });
  }
);
Slot.displayName = "Slot";
