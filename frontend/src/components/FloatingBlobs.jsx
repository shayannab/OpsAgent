export default function FloatingBlobs() {
    return (
        <>
            {/* Top-left green blob */}
            <div className="blob animate-blob"
                style={{ width: 500, height: 500, background: '#00e97b', top: -150, left: -150 }} />
            {/* Top-right purple blob */}
            <div className="blob animate-blob-slow"
                style={{ width: 450, height: 450, background: '#a855f7', top: -100, right: -150, animationDelay: '2s' }} />
            {/* Mid-left teal blob */}
            <div className="blob animate-blob"
                style={{ width: 400, height: 400, background: '#58d1bd', top: '40%', left: -100, animationDelay: '4s' }} />
            {/* Bottom-right yellow blob */}
            <div className="blob animate-blob-slow"
                style={{ width: 500, height: 500, background: '#ffd74a', bottom: -200, right: -150, animationDelay: '1s' }} />
            {/* Center coral blob */}
            <div className="blob animate-blob"
                style={{ width: 300, height: 300, background: '#ff6b6b', top: '60%', left: '50%', transform: 'translateX(-50%)', animationDelay: '3s' }} />
        </>
    )
}
