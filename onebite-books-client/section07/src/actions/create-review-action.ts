'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

// useActionState 형식에 따라 첫번째 인수를 state로 바꾼다 (사용 안하면 그냥 언더바)
export async function createReviewAction(_: any, formData: FormData) {
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) {
        return {
            status: false,
            error: '리뷰 내용과 작성자를 입력해주세요.',
        };
    }

    try {
        await delay(2000);

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

        return {
            status: true,
            error: '',
        };
    } catch (err) {
        console.error(err);

        return {
            status: false,
            error: `리뷰 저장에 실패했습니다. : ${err}`,
        };
    }
}
