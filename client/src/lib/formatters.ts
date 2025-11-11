export interface PlatformConfig {
  name: string;
  limit: number;
  formatter: (blurb: string, hashtags: string, cta: string) => string;
}

const formatLinkedIn = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (hashtags) {
    result += `\n\n${hashtags}`;
  }
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  return result;
};

const formatTwitter = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  if (hashtags) {
    result += ` ${hashtags}`;
  }
  
  return result;
};

const formatThreads = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  if (hashtags) {
    result += `\n\n${hashtags}`;
  }
  
  return result;
};

const formatInstagram = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  if (hashtags) {
    result += `\n\n${hashtags}`;
  }
  
  return result;
};

const formatFacebook = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  if (hashtags) {
    result += `\n\n${hashtags}`;
  }
  
  return result;
};

const formatBlueSky = (blurb: string, hashtags: string, cta: string): string => {
  if (!blurb.trim()) return '';
  
  let result = blurb;
  
  if (cta) {
    result += `\n\n${cta}`;
  }
  
  if (hashtags) {
    result += ` ${hashtags}`;
  }
  
  return result;
};

export const platforms: PlatformConfig[] = [
  {
    name: 'LinkedIn',
    limit: 3000,
    formatter: formatLinkedIn,
  },
  {
    name: 'X',
    limit: 280,
    formatter: formatTwitter,
  },
  {
    name: 'Threads',
    limit: 500,
    formatter: formatThreads,
  },
  {
    name: 'Instagram',
    limit: 2200,
    formatter: formatInstagram,
  },
  {
    name: 'Facebook',
    limit: 63206,
    formatter: formatFacebook,
  },
  {
    name: 'BlueSky',
    limit: 300,
    formatter: formatBlueSky,
  },
];
