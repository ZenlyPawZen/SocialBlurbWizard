import { Button } from "@/components/ui/button";
import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";

interface PlatformCardProps {
  platform: string;
  icon: React.ReactNode;
  formattedText: string;
  characterLimit: number;
  accentColor?: string;
  onOptimize?: () => void;
  isOptimizing?: boolean;
  isOptimized?: boolean;
}

export default function PlatformCard({
  platform,
  icon,
  formattedText,
  characterLimit,
  accentColor,
  onOptimize,
  isOptimizing = false,
  isOptimized = false,
}: PlatformCardProps) {
  const [copied, setCopied] = useState(false);

  const currentLength = formattedText.length;
  const isOverLimit = currentLength > characterLimit;
  const isNearLimit = currentLength >= characterLimit * 0.9;

  const truncatedText = isOverLimit
    ? formattedText.slice(0, characterLimit)
    : formattedText;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(truncatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCountColor = () => {
    if (isOverLimit) return "text-destructive font-semibold";
    if (isNearLimit) return "text-amber-600 dark:text-amber-500";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-card border border-card-border rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-card-border">
        <div className="flex items-center gap-2">
          <div className={accentColor}>{icon}</div>
          <span className="font-medium">{platform}</span>
        </div>
        <div className={`text-xs font-mono ${getCountColor()}`} data-testid={`count-${platform.toLowerCase()}`}>
          {currentLength}/{characterLimit}
        </div>
      </div>

      <div className="min-h-[120px] p-4 bg-muted/30 flex-1">
        {formattedText ? (
          <div className="whitespace-pre-wrap text-sm" data-testid={`preview-${platform.toLowerCase()}`}>
            {truncatedText}
            {isOverLimit && (
              <span className="text-muted-foreground ml-1">(truncated)</span>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Enter text above to see formatted preview</p>
        )}
      </div>

      <div className="p-3 space-y-2">
        {onOptimize && (
          <Button
            data-testid={`button-optimize-${platform.toLowerCase()}`}
            onClick={onOptimize}
            disabled={!formattedText || isOptimizing}
            className="w-full"
            variant={isOptimized ? "default" : "outline"}
          >
            {isOptimizing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Optimizing...
              </>
            ) : isOptimized ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Optimized
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize for {platform}
              </>
            )}
          </Button>
        )}
        <Button
          data-testid={`button-copy-${platform.toLowerCase()}`}
          onClick={handleCopy}
          disabled={!formattedText}
          className="w-full"
          variant={copied ? "default" : "secondary"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy for {platform}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
