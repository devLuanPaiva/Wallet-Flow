import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "fixed top-4 right-4 w-[300px] rounded-lg border p-4 shadow-lg z-10",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-300 text-gray-900",
        destructive: "bg-red-50 border-red-500 text-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { show: boolean; onClose: () => void }
>(({ className, variant, show, onClose, ...props }, ref) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Esconder o alerta após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Transition
      in={show}
      timeout={400}
      unmountOnExit
      onExited={onClose}
    >
      {(state) => (
        <div
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant }), className, {
            "alert-enter": state === "entering",
            "alert-enter-active": state === "entered",
            "alert-exit": state === "exiting",
            "alert-exit-active": state === "exited",
          })}
          {...props}
        />
      )}
    </Transition>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
