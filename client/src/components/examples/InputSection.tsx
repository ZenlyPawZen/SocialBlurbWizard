import InputSection from '../InputSection';
import { useState } from 'react';

export default function InputSectionExample() {
  const [blurb, setBlurb] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [cta, setCta] = useState('');

  return (
    <InputSection
      blurb={blurb}
      hashtags={hashtags}
      cta={cta}
      onBlurbChange={setBlurb}
      onHashtagsChange={setHashtags}
      onCtaChange={setCta}
    />
  );
}
