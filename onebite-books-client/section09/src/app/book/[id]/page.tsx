import { notFound } from 'next/navigation';
import style from './page.module.css';
import { BookData, ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';

export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
        { next: { tags: [`review-${bookId}`] } }
    );
    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }

    const book = await response.json();
    const { id, title, subTitle, description, author, publisher, coverImgUrl } =
        book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${coverImgUrl}')` }}
            >
                <Image
                    src={coverImgUrl}
                    width={240}
                    height={300}
                    alt={`cover-of-book-${title}`}
                />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

async function ReviewList({ bookId }: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`
    );

    if (!response.ok) {
        return <div>ERROR</div>;
        // error.tsx가 잘 돌아간다면 아래 코드를 사용
        // throw new Error(`Review fetch failed : ${response.statusText}`);
    }

    const reviews: ReviewData[] = await response.json();

    return (
        <section>
            {reviews.map((review) => (
                <ReviewItem key={`review-item-${review.id}`} {...review} />
            ))}
        </section>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // 책의 정보를 담아주는 게 좋겠다 > 위에 BookDetail처럼 fetch 함수 호출
    // 두 번 불러와도 문제 없음 > Request Memoization (하나의 페이지를 렌더링 할 때 중복 API 호출 방지)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
        { cache: 'force-cache' }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const book: BookData = await response.json();

    return {
        title: `${book.title} - 한입북스`,
        description: `${book.description}`,
        openGraph: {
            title: `${book.title} - 한입북스`,
            description: `${book.description}`,
            images: [book.coverImgUrl],
        },
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className={style.container}>
            <BookDetail bookId={params.id} />
            <ReviewEditor bookId={params.id} />
            <ReviewList bookId={params.id} />
        </div>
    );
}
