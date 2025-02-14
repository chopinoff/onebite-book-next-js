'use client';

import { useActionState, useEffect } from 'react';
import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review-action';

// 로딩 상태를 띄우고 중복 제출을 막아보자
// useActionState 사용하기 (Reactv19)
// form 사용할 때는 적극적으로 이용하기
export default function ReviewEditor({ bookId }: { bookId: string }) {
    // state: form의 상태, formAction: formAction, isPending: 로딩 상태 (true면 아직 로딩 중)
    const [state, formAction, isPending] = useActionState(
        createReviewAction, // 다루려는 함수
        null // 초기값
    );
    // 에러 핸들링도 해보자 (state를 받기 때문에)
    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    return (
        <section>
            <form className={style.form_container} action={formAction}>
                <input name="bookId" value={bookId} hidden readOnly />
                <textarea
                    disabled={isPending}
                    required
                    name="content"
                    placeholder="리뷰 내용"
                />
                <div className={style.submit_container}>
                    <input
                        disabled={isPending}
                        required
                        name="author"
                        placeholder="작성자"
                    />
                    <button type="submit" disabled={isPending}>
                        {isPending ? '...' : '작성하기'}
                    </button>
                </div>
            </form>
        </section>
    );
}
