'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

// useActionState 형식에 따라 첫번째 인수를 state로 바꾼다 (사용 안하면 그냥 언더바)
export async function createReviewAction(_: any, formData: FormData) {
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) {
        // return값 설정
        return {
            status: false,
            error: '리뷰 내용과 작성자를 입력해주세요.',
        };
    }

    try {
        await delay(2000);
        // 사용자는 2초동안 어떠한 피드백도 받을 수 없음
        // 만약 이 2초동안 여러 번 폼 제출 클릭하면 중복 처리 없이 다 제출 됨 > 문제다! 방지 해야함
        // ReviewEditor 컴포넌트를 클라이언트 컴포넌트로 바꿔서 로딩 상태를 만들어서 중복 제출을 막아보자
        // ReviewEditor에서 return값을 사용할 수 있게 return값 설정해주기
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: 'POST',
                body: JSON.stringify({ bookId, content, author }),
            }
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        revalidateTag(`review-${bookId}`);
        // return값 설정
        return {
            status: true,
            error: '',
        };
    } catch (err) {
        console.error(err);
        // return값 설정
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다. : ${err}`,
        };
    }
}
