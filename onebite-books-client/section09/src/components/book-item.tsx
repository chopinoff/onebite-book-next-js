import type { BookData } from '@/types';
import Link from 'next/link';
import style from './book-item.module.css';
import Image from 'next/image';

export default function BookItem({
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
}: BookData) {
    return (
        <Link href={`/book/${id}`} className={style.container} scroll={false}>
            <Image
                src={coverImgUrl}
                width={80}
                height={105}
                alt={`cover-of-book-${title}`}
                // ... was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
                // 라는 에러 해결하기 위해 삽입
                priority
            />
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <br />
                <div className={style.author}>
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}
