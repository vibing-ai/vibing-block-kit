import React from 'react';
import { ImageBlock } from './';

const ImageZoomDemo: React.FC = () => {
  const demoImages = [
    {
      id: 'nature-1',
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
      alt: 'Beautiful mountain landscape with lake',
      caption: 'Click to zoom this beautiful landscape',
      width: 800,
      height: 533,
    },
    {
      id: 'nature-2',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
      alt: 'Misty forest path in autumn',
      caption: 'Another zoomable image',
      width: 800,
      height: 533,
    },
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <h1>Image Zoom Demo</h1>
      <p>Click on any image below to enable the zoom feature.</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}>
        {demoImages.map((image) => (
          <div key={image.id} style={{ marginBottom: '2rem' }}>
            <h3>{image.caption}</h3>
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}>
              <ImageBlock
                id={image.id}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                caption={image.caption}
                zoomable
                borderRadius="md"
                hasBorder={false}
                loading="lazy"
                // Add a low-quality image placeholder (LQIP) for better UX
                lqip="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0jOWM5YzljPkxvYWRpbmc8L3RleHQ+PC9zdmc+"
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h2>How to use the Zoom Feature</h2>
        <p>The ImageBlock component now includes a built-in zoom feature. To enable it, simply set the <code>zoomable</code> prop to <code>true</code>.</p>
        
        <h3>Example Usage:</h3>
        <pre style={{
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
        }}>
{`<ImageBlock
  src="path/to/your/image.jpg"
  alt="Description of image"
  width={800}
  height={600}
  zoomable
  caption="Click to zoom"
  borderRadius="md"
  hasBorder
  loading="lazy"
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ImageZoomDemo;
