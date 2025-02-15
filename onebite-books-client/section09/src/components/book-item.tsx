// http archive에 따르면 이미지는 평균적으로 웹 페이지 용량의 58%를 차지한다
// 다양한 이미지 최적화 기법들: webp, AVIF 등 차세대 형식으로 변환, 디바이스 사이즈에 맞는 이미지, 레이지 로딩, 블러 이미지 등등
// 이 최적화 기법들을 Next.js에서는 Image 태그를 사용하면 자동으로 적용할 수 있다!
// 현재 문제점: 개발자 도구 Network 탭에서 캐시 비우고 강력 새로고침 후 Image 필터링 해서 확인
// 1. jpeg 형식
// 2. 현재 화면에 없는 이미지까지 한번에 불러옴
// 3. 필요한 사이즈보다 큰 사이즈의 이미지를 불러옴

// 이대로 Image만 적용하면 에러 뜸
// Error: Invalid src prop (https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg) on `next/image`, hostname "shopping-phinf.pstatic.net" is not configured under images in your `next.config.js`
// 해석: 현재 사용중인 src 주소를 Image에 이용하려면 next.config.js에 몇가지 옵션을 추가해야 함
// Image에 사용하는 이미지가 프로젝트 내부에 저장된 이미지가 아닌 외부 이미지면 Next.js 보안 때문에 자동으로 차단됨
// next.config.mjs에 해당 도메인으로부터 불러오는 이미지는 안전하다는 명시를 해줘야 함
// 도메인은 콘솔의 에러 메시지에서 확인

// 적용 후 (Network)
// 1. webp로 변환됨
// 2. size 용량 작아짐
// 3. 레이지 로딩 적용 (스크롤 내리면 이미지 불러옴)

// 도서 상세 페이지의 이미지까지 최적화 해보기

// 이 외에도 다양한 이미지 최적화를 제공하므로 공식 문서 읽어보기:
// 이미지 크기를 반응형으로 렌더링하는 법: https://nextjs.org/docs/app/api-reference/components/image#responsive-images
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
        <Link href={`/book/${id}`} className={style.container}>
            <Image
                src={coverImgUrl}
                width={80}
                height={105}
                alt={`cover-of-book-${title}`}
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
