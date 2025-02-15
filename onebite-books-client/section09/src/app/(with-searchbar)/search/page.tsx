import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
    await delay(1500);
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }

    const books: BookData[] = await response.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

// search 페이지는 동적인 값을 사용해야 함 (q)
// 이럴 때는 generateMetadata를 사용함: 현재 페이지의 메타 데이터를 동적으로 생성하는 역할
// Page가 받는 props를 그대로 받을 수 있음
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    return {
        title: `${q} : 한입북스 검색`,
        description: `${q}의 검색 결과입니다.`,
        openGraph: {
            title: `${q} : 한입북스 검색`,
            description: `${q}의 검색 결과입니다.`,
            images: ['/thumbnail.svg'],
        },
    };
}

export default function Page(props: { searchParams: { q?: string } }) {
    const searchParams = props.searchParams;
    return (
        <Suspense
            key={searchParams.q || ''}
            fallback={<BookListSkeleton count={3} />}
        >
            <SearchResult q={searchParams.q || ''} />
        </Suspense>
    );
}
