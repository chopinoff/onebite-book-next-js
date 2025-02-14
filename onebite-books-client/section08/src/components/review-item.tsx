import { ReviewData } from '@/types';
import style from './review-item.module.css';
import ReviewItemDeleteButton from './review-item-delete-button';

export default function ReviewItem({
    id,
    content,
    author,
    createdAt,
    bookId,
}: ReviewData) {
    return (
        <div className={style.container}>
            <div className={style.author}>{author}</div>
            <div className={style.content}>{content}</div>
            <div className={style.bottom_container}>
                <div className={style.date}>
                    {new Date(createdAt).toLocaleString()}
                </div>
                {/* 클라이언트 컴포넌트 분리해서 작성하기 */}
                <ReviewItemDeleteButton bookId={bookId} reviewId={id} />
            </div>
        </div>
    );
}
