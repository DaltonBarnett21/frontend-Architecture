import React, { useEffect, useState } from "react";

const useGenerateFilePreview = () => {
  const [URLs, setURLs] = useState([]);
  const [Previews, setPreviews] = useState([]);

  useEffect(() => {
    const newImageUrls: any = [];
    if (Previews?.length < 1) return;
    Previews.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));

    setURLs(newImageUrls);
  }, [Previews]);

  return {
    setURLs,
    URLs,
    setPreviews,
  };
};

export default useGenerateFilePreview;
