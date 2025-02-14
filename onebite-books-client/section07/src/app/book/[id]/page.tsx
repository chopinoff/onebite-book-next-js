import { notFound } from 'next/navigation';
import style from './page.module.css';
import { createReviewAction } from '@/actions/create-review-action';

export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
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
                <img src={coverImgUrl} />
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

function ReviewEditor({ bookId }: { bookId: string }) {
    // 서버 액션을 만들고 폼을 제출해 사용하면 자동으로 서버 액션을 호출하는 HTTP 리퀘스트가 서버에게 날라가고
    // 이러한 서버 액션들은 컴파일 결과 자동으로 특정 해시값을 갖는 API로 설정되어서 브라우저 측에서 서버 액션 호출할 때 리퀘스트 헤더에 Next-Action이라는 이름으로 현재 호출하고자 하는 액션의 해시값이 함께 명시됨

    // 쉽게 설명: 코드 상에 서버 액션 만들면 자동으로 이런 코드르 실행하는 API 만들어짐
    // 폼 액션으로 설정하면 폼 태그를 제출했을 때 자동으로 호출됨

    // Payload에서 전달된 값(Form Data)을 확인할 수 있음
    // 따라서 서버 액션에서 직접 꺼내서 사용할 수 있음
    // async function createReviewAction() {};

    // 폼 태그 제출되면 자동으로 서버측으로 요청이 발송되어 액션 프롭스로 설정된 createReviewAction이라는 서버 액션 함수가 실행됨
    // 브라우저에서 폼 태그 제출 후 확인해보기
    // Network 탭에서 리퀘스트가 발송되는 것 확인할 수 있음
    // 브라우저로부터 요청을 받아서 createReviewAction이 실행된 것임
    // 터미널에서 로그도 확인할 수 있음

    return (
        <section>
            {/* form 태그에서 action의 역할: 폼 내부에 데이터를 보내는 목적지 url을 지정 */}
            <form action={createReviewAction}>
                {/* ** 안 보이는 input 태그 추가
                 ** 그런데 새 버전 기준으로 hidden 쓰면 에러 뜸
                 ** value는 제공하지만 onChange handler을 제공하지 않음: readOnly 추가하면 됨 */}
                <input name="bookId" value={bookId} hidden readOnly />
                <input required name="content" placeholder="리뷰 내용" />
                <input required name="author" placeholder="작성자" />
                <button type="submit">작성하기</button>
            </form>
        </section>
    );
}

// 현재 페이지에서는 한 개의 id만 전달받을 것이므로 string만 취급 (string[] 삭제)
export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className={style.container}>
            <BookDetail bookId={params.id} />
            <ReviewEditor bookId={params.id} />
        </div>
    );
}
