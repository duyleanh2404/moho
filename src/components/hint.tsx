import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HintProps {
  children: React.ReactNode;
  label: string;
}

export const Hint = ({ children, label }: HintProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};
