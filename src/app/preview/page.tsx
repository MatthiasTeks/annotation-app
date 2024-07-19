'use client';

import { useState } from 'react';
import ImageUploader from './components/ImageUploader';

export default function Page() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [engravedImage, setEngravedImage] = useState<string | null>(null);

  const handleImageUpload = async (image: string) => {
    setOriginalImage(image);
    const response = await fetch('/api/engraving', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });
    const data = await response.json();
    setEngravedImage(data.image);
  };

  return (
    <div>
      <h1>Gravure sur Bois</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {originalImage && (
        <div>
          <h2>Image Originale</h2>
          <img src={originalImage} alt='Original' />
        </div>
      )}
      {engravedImage && (
        <div>
          <h2>Image Gravée</h2>
          <img src={engravedImage} alt='Engraved' />
        </div>
      )}
    </div>
  );
}
