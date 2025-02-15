'use server';

import { revalidateTag } from 'next/cache';

// delay 제거
export async function deleteReviewAction(_: any, formData: FormData) {
    const bookId = formData.get('bookId')?.toString();
    const reviewId = formData.get('reviewId')?.toString();

    if (!reviewId) {
        return {
            status: false,
            error: '존재하지 않는 리뷰입니다. 다시 확인해주세요.',
        };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${Number(
                reviewId
            )}`,
            {
                method: 'DELETE',
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
        return {
            status: false,
            error: `리뷰 삭제에 실패했습니다. : ${err}`,
        };
    }
}
