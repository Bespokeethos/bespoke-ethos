import { Section } from "@/common/layout";
import { richTextClasses } from "@/app/_components/rich-text";

export interface FreeformTextProps {
  children?: React.ReactNode;
}

export function FreeformText({ children }: FreeformTextProps) {
  if (!children) return null;
  return (
    <Section>
      <div className={richTextClasses}>
        {children}
      </div>
    </Section>
  );
}
