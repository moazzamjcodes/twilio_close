import { CheckIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId } from "react";

type PropsType = {
  withIcon?: boolean;
  background?: "dark" | "light";
  backgroundSize?: "sm" | "default";
  name?: string;
  checked?: boolean; // Accept checked state from the parent
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Switch({
  background,
  withIcon,
  backgroundSize,
  name,
  checked = false, // Default to false if not provided
  onChange
}: PropsType) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex max-w-fit cursor-pointer select-none items-center"
    >
      <div className="relative">
        <input type="checkbox" name={name} id={id} className="peer sr-only" checked={checked} onChange={onChange}/>
        <div
          className={cn(
            "h-8 w-14 rounded-full bg-gray-300 dark:bg-[#5A616B] peer-checked:bg-primary peer-checked:dark:bg-primary transition-colors",
            {
              "h-5": backgroundSize === "sm",
            }
          )}
        />
        <div className="absolute left-1 top-1 flex size-6 items-center justify-center rounded-full bg-primary shadow-switch-1 transition peer-checked:right-1 peer-checked:translate-x-full" />

        <div
          className={cn(
            "absolute left-1 top-1 flex size-6 items-center justify-center rounded-full bg-white shadow-switch-1 transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden",
            {
              "-top-1 left-0 size-7 shadow-switch-2": backgroundSize === "sm",
              "peer-checked:bg-primary peer-checked:dark:bg-white":
                background !== "dark",
            },
          )}
        >
          {withIcon && (
            <>
              <CheckIcon className="check-icon hidden fill-white dark:fill-dark" />
              <XIcon className="x-icon" />
            </>
          )}
        </div>
      </div>
    </label>
  );
}
