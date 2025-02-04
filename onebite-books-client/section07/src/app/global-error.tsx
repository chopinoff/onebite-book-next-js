'use client';

import { useEffect } from 'react';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <html>
            <body>
                <h3>오류가 발생했습니다.</h3>
            </body>
        </html>
    );
}
