'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error.message);
    }, []);

    const router = useRouter();

    return (
        <div>
            <h3>검색 중 오류가 발생했습니다.</h3>
            <button
                onClick={() => {
                    startTransition(() => {
                        router.refresh();
                        reset();
                    });
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
