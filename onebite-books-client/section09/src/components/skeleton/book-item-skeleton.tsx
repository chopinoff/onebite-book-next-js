import style from './book-item-skeleton.module.css';

// 목표: 기존 BookItem과 동일한 구조를 가지게 div 태그를 배치하기
// + className으로 역할 명시
// 개발하면서 실시간으로 비교하기 위해 index 페이지에 삽입
// 스타일은 book-item.module.css, 브라우저 실제 치수 등을 참고해 작성
export default function BookItemSkeleton() {
    return (
        <div className={style.container}>
            <div className={style.cover_img}></div>
            <div className={style.info_container}>
                <div className={style.title}></div>
                <div className={style.subtitle}></div>
                <br />
                <div className={style.author}></div>
            </div>
        </div>
    );
}
