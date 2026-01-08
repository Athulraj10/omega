"use client";
import React from 'react';

interface BannerPreviewProps {
  image: string;
  titleLine1: string;
  titleLine2: string;
  offerText: string;
  offerHighlight: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  animation: string;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({
  image,
  titleLine1,
  titleLine2,
  offerText,
  offerHighlight,
  buttonText,
  backgroundColor,
  textColor,
  animation,
}) => {
  // Fix image URL to ensure it's absolute
  const getImageUrl = () => {
    if (!image) return '';
    
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8001';
    
    // If already absolute URL or base64
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
      return image;
    }
    
    // Remove "fake" prefix if present
    let cleanImg = image.replace(/^fake\/?/, '').trim();
    
    // Ensure it starts with / for proper path construction
    if (!cleanImg.startsWith('/')) {
      cleanImg = '/' + cleanImg;
    }
    
    // Construct absolute URL
    return `${apiEndpoint}${cleanImg}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Banner Preview</h3>
      
      <div 
        className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundColor: imageUrl ? 'transparent' : backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        {imageUrl && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1
            }}
          ></div>
        )}
        
        {/* Content */}
        <div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6"
          style={{ color: image ? '#ffffff' : textColor }}
        >
          {offerText && (
            <p className="text-sm md:text-base mb-2 font-medium">
              {offerText} {offerHighlight && <span className="font-bold">{offerHighlight}</span>}
            </p>
          )}
          
          {titleLine1 && (
            <h1 className="text-xl md:text-3xl font-bold mb-2 leading-tight">
              {titleLine1}
            </h1>
          )}
          
          {titleLine2 && (
            <h2 className="text-lg md:text-xl mb-4 font-medium">
              {titleLine2}
            </h2>
          )}
          
          {buttonText && (
            <div className="mt-auto">
              <button 
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                style={{ pointerEvents: 'none' }}
              >
                {buttonText}
                <i className="fi-rr-angle-double-small-right ml-2" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Preview Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Animation:</span>
          <span className="font-medium capitalize">{animation}</span>
        </div>
        <div className="flex justify-between">
          <span>Background:</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: backgroundColor }}
            ></div>
            <span className="font-mono text-xs">{backgroundColor}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Text Color:</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: textColor }}
            ></div>
            <span className="font-mono text-xs">{textColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPreview; 