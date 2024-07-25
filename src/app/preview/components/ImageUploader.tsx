import { ChangeEvent, useState } from 'react';

type ImageUploaderProps = {
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (image: string) => void;
};

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onImageUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
