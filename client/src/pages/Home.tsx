import { useEffect, useState } from "react";
import InputSection from "@/components/InputSection";
import PlatformCard from "@/components/PlatformCard";
import { platforms } from "@/lib/formatters";
import { SiLinkedin, SiX, SiThreads, SiInstagram, SiFacebook, SiBluesky } from "react-icons/si";
import type { OptimizeRequest, OptimizeResponse } from "@shared/types";
import { useToast } from "@/hooks/use-toast";
import { useSessionCache } from "@/hooks/use-session-cache";

const platformIcons = {
  LinkedIn: <SiLinkedin className="w-5 h-5" />,
  X: <SiX className="w-5 h-5" />,
  Threads: <SiThreads className="w-5 h-5" />,
  Instagram: <SiInstagram className="w-5 h-5" />,
  Facebook: <SiFacebook className="w-5 h-5" />,
  BlueSky: <SiBluesky className="w-5 h-5" />,
};

const platformAccents = {
  LinkedIn: "text-[#0A66C2]",
  X: "text-foreground",
  Threads: "text-foreground",
  Instagram: "text-[#E4405F]",
  Facebook: "text-[#1877F2]",
  BlueSky: "text-[#1185FE]",
};

export default function Home() {
  const { 
    blurb, 
    hashtags, 
    cta, 
    optimizedContent, 
    updateContent, 
    updateOptimizedContent 
  } = useSessionCache();
  const [optimizingPlatform, setOptimizingPlatform] = useState<string | null>(null);
  const { toast } = useToast();

  // Update content when inputs change
  const handleBlurbChange = (newBlurb: string) => {
    updateContent(newBlurb, hashtags, cta);
  };

  const handleHashtagsChange = (newHashtags: string) => {
    updateContent(blurb, newHashtags, cta);
  };

  const handleCtaChange = (newCta: string) => {
    updateContent(blurb, hashtags, newCta);
  };

  const handleOptimize = async (platformName: string, characterLimit: number) => {
    if (!blurb.trim()) return;

    setOptimizingPlatform(platformName);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blurb,
          hashtags,
          cta,
          platform: platformName,
          characterLimit,
        } as OptimizeRequest),
      });

      if (!res.ok) {
        throw new Error("Optimization failed");
      }

      const data = await res.json() as OptimizeResponse;

      updateOptimizedContent(platformName, data.optimizedText);

      toast({
        title: "Optimized!",
        description: `Your post has been optimized for ${platformName}`,
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Unable to optimize content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOptimizingPlatform(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-2" data-testid="text-title">
            Social Formatter
          </h1>
          <p className="text-muted-foreground">
            Transform marketing copy into platform-ready posts
          </p>
        </header>

        <div className="mb-8">
          <InputSection
            blurb={blurb}
            hashtags={hashtags}
            cta={cta}
            onBlurbChange={handleBlurbChange}
            onHashtagsChange={handleHashtagsChange}
            onCtaChange={handleCtaChange}
          />
        </div>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Formatted Posts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {platforms.map((platform) => {
              const formattedText = optimizedContent[platform.name] || platform.formatter(blurb, hashtags, cta);
              return (
                <PlatformCard
                  key={platform.name}
                  platform={platform.name}
                  icon={platformIcons[platform.name as keyof typeof platformIcons]}
                  formattedText={formattedText}
                  characterLimit={platform.limit}
                  accentColor={platformAccents[platform.name as keyof typeof platformAccents]}
                  onOptimize={() => handleOptimize(platform.name, platform.limit)}
                  isOptimizing={optimizingPlatform === platform.name}
                  isOptimized={!!optimizedContent[platform.name]}
                />
              );
            })}
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            No data stored. All processing happens in your browser.
          </p>
        </footer>
      </div>
    </div>
  );
}
