import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { Suspense } from 'react';

// delay 삭제
async function SearchResult({ q }: { q: string }) {
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
