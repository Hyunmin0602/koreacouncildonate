import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?name=홍길동
        const name = searchParams.get('name') || '후원자';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8fafc', // slate-50
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #e2e8f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e2e8f0 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                >
                    {/* Decorative Blob 1 */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -100,
                            left: -100,
                            width: 600,
                            height: 600,
                            background: '#60a5fa', // blue-400
                            borderRadius: '50%',
                            opacity: 0.2,
                            filter: 'blur(80px)',
                        }}
                    />
                    {/* Decorative Blob 2 */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -100,
                            right: -100,
                            width: 600,
                            height: 600,
                            background: '#a78bfa', // purple-400
                            borderRadius: '50%',
                            opacity: 0.2,
                            filter: 'blur(80px)',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 40,
                            padding: '60px 80px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                marginBottom: 20,
                            }}
                        >
                            <div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: '50%' }} />
                            <span style={{ fontSize: 24, fontWeight: 600, color: '#475569', letterSpacing: '0.1em' }}>
                                OFFICIAL CERTIFICATION
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: 80, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>
                                {name} 님
                            </span>
                            <span style={{ fontSize: 40, fontWeight: 500, color: '#3b82f6' }}>
                                따뜻한 후원에 감사드립니다
                            </span>
                        </div>

                        <div
                            style={{
                                marginTop: 40,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontSize: 20,
                                color: '#94a3b8',
                            }}
                        >
                            <span>대한학생회</span>
                            <span style={{ width: 4, height: 4, background: '#cbd5e1', borderRadius: '50%' }} />
                            <span>Donate Check System</span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
