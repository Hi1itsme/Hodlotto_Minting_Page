import React from 'react';

interface EarthBackgroundProps {
    children: React.ReactNode;
    className?: string;
    brightness?: number;
    contrast?: number;
}

const EarthBackground: React.FC<EarthBackgroundProps> = ({
    children,
    className = "",
    brightness = 0.3,
    contrast = 1.2
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Earth Video Background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: `brightness(${brightness}) contrast(${contrast})`
                    }}
                    onLoadedData={() => console.log('Earth video loaded successfully')}
                    onError={(e) => console.error('Earth video error:', e)}
                >
                    <source src="/Horizon_Video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Video overlay for better glass effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)',
                        backdropFilter: 'blur(1px)',
                        WebkitBackdropFilter: 'blur(1px)'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default EarthBackground; 