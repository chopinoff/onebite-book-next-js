'use client';

import { deleteReviewAction } from '@/actions/delete-review-action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
    bookId,
    reviewId,
}: {
    bookId: number;
    reviewId: number;
}) {
    // 프로그래매틱하게 폼 제출하기
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        deleteReviewAction,
        null
    );

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction}>
            <input name="bookId" value={bookId} hidden readOnly />
            <input name="reviewId" value={reviewId} hidden readOnly />
            {/* requestSubmit이라는 특수한 함수 쓰는 이유: submit은 유효성 검사 등등 제외하고 강제로 폼을 제출하는 메서드라서 위험 */}
            {/* requestSubmit이 훨씬 안전함 */}
            {/* button이 아닌 경우 이렇게 사용하면 된다 */}
            {isPending ? (
                <div>...</div>
            ) : (
                <div
                    onClick={() => formRef.current?.requestSubmit()}
                    style={{ cursor: 'pointer' }}
                >
                    삭제하기
                </div>
            )}
        </form>
    );
}
