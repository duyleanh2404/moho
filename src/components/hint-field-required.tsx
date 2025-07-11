import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HintProps {
  children: React.ReactNode;
}

export const HintFieldRequired = ({ children }: HintProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          {children}
          <span className="text-red-500 ml-1">*</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Thông tin này là bắt buộc!</p>
      </TooltipContent>
    </Tooltip>
  );
};
