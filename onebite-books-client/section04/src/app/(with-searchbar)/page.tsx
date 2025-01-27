import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'no-store' }
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

// 설정하지 않으면 기보니값 : no-store
// Next.js v14까지는 기본 값이 force-cache였으나 많은 사람들이 불편해 해서 v15부터 바뀜

// force-cache: 캐시된 데이터를 계속 불러오기 때문에 새로고침 해도 RecoBooks 변화 없음
// 직접 확인해보개: .next/cache/fetch-cache : json 형태로 보관
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
