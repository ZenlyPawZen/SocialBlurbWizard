import PlatformCard from '../PlatformCard';
import { SiLinkedin } from 'react-icons/si';

export default function PlatformCardExample() {
  return (
    <PlatformCard
      platform="LinkedIn"
      icon={<SiLinkedin className="w-5 h-5" />}
      formattedText="This is a sample LinkedIn post with proper formatting and line breaks.

Check out our latest product launch!"
      characterLimit={3000}
      accentColor="text-[#0A66C2]"
      onOptimize={() => console.log('Optimize clicked')}
      isOptimizing={false}
      isOptimized={false}
    />
  );
}
