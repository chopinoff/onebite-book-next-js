import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '한입북스',
    description: '한입 북스에 등록된 도서를 만나보세요.',
    openGraph: {
        title: '한입북스',
        description: '한입 북스에 등록된 도서를 만나보세요.',
        images: ['/thumbnail.svg'],
    },
};

// 배포 후 최적화 해보기
// index, search, book, actions > vercel --prod로 프로덕션 모드로 배포
// index 페이지 최적화: dynamic 페이지 > static 페이지로 전환
// export const dynamic = 'force-dynamic' 옵션 삭제
// 위 옵션 삭제하면 Suspense도 필요 없기 때문에 삭제

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'force-cache' }
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }
    const allBooks: BookData[] = await response.json();
    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        { next: { revalidate: 3 } }
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }
    const recoBooks: BookData[] = await response.json();
    return (
        <div>
            {recoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
            </section>
        </div>
    );
}
