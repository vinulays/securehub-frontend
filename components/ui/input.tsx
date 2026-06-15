import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  showPasswordToggle = false,
  ...props
}: React.ComponentProps<"input"> & { showPasswordToggle?: boolean }) {
  const [visible, setVisible] = useState<boolean>(false);

  const isPassword = type === "password";

  const getInputType = () => {
    if (isPassword && showPasswordToggle) {
      return visible ? "text" : "password";
    }

    return type;
  };

  const inputType = getInputType();

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "h-10 w-full min-w-0 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:shadow-none md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
      />

      {isPassword && showPasswordToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-4 flex items-center text-primary"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeOffIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
