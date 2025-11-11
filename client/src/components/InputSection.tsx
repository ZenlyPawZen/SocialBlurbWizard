import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputSectionProps {
  blurb: string;
  hashtags: string;
  cta: string;
  onBlurbChange: (value: string) => void;
  onHashtagsChange: (value: string) => void;
  onCtaChange: (value: string) => void;
}

export default function InputSection({
  blurb,
  hashtags,
  cta,
  onBlurbChange,
  onHashtagsChange,
  onCtaChange,
}: InputSectionProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="blurb" className="text-sm font-medium">
          Marketing Blurb
        </Label>
        <Textarea
          id="blurb"
          data-testid="input-blurb"
          placeholder="Enter your marketing blurb..."
          value={blurb}
          onChange={(e) => onBlurbChange(e.target.value)}
          className="min-h-32 resize-none"
        />
        <p className="text-xs text-muted-foreground">
          This will be formatted for each platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hashtags" className="text-sm font-medium">
            Hashtags (Optional)
          </Label>
          <Input
            id="hashtags"
            data-testid="input-hashtags"
            placeholder="#marketing #social"
            value={hashtags}
            onChange={(e) => onHashtagsChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Optional: Add relevant hashtags
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta" className="text-sm font-medium">
            Call to Action (Optional)
          </Label>
          <Input
            id="cta"
            data-testid="input-cta"
            placeholder="Learn more at..."
            value={cta}
            onChange={(e) => onCtaChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Optional: Add call-to-action or link
          </p>
        </div>
      </div>
    </div>
  );
}
