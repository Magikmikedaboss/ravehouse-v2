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
          <p className="text-xxs uppercase lg:tracking-wider text-white/50">
            {eyebrow}
          </p>
        )}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-white/65">{description}</p>
        )}
      </div>
      {endSlot && <div className="text-xs text-white/60">{endSlot}</div>}    </div>
  );
}
