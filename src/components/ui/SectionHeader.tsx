import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  endSlot?: ReactNode;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  endSlot,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xxs uppercase lg:tracking-wider text-[rgb(var(--rh-text-secondary))]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-lg font-semibold text-[rgb(var(--rh-text-primary))]">{title}</h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-[rgb(var(--rh-text-secondary))]">{description}</p>
        )}
      </div>
      {endSlot && <div className="text-xs text-[rgb(var(--rh-text-secondary))]">{endSlot}</div>}    </div>
  );
}
