// 현재 아쉬운 점: 제출한 리뷰를 보려면 새로고침 해야함
// 바라는 것: createReveiwAction이 성공적으로 끝났을 때 ReviewList를 서버측에서 다시 렌더링해서 브라우저로 보내주는 것
// 혹은 bookPage 자체를 재렌더링 하는 것
// 한 마디로 페이지를 재검증하기를 원하는 것임
// 구현?: revalidatePath

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) {
        return;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: 'POST',
                body: JSON.stringify({ bookId, content, author }),
            }
        );
        console.log(response.status);
        // 역할: /book/[id]/page.tsx의 Page 컴포넌트를 재렌더링
        // 따라서 그 안의 자식 컴포넌트 모두 재렌더링 (당연히 안에 fetch 함수도 모두 재실행)
        // 서버 액션 내부에서 이걸 사용하면 페이지 재렌더링해서 다시 나타나게 할 수 있음
        // 주의 1: revalidatePath는 서버에서만 사용할 수 있음 (serverAction이나 server Component에서만 사용 가능)
        // 주의 2: 해당 페이지의 모든 캐시를 무효화함(페이지 전체를 재생성하니까)
        // 주의 3: 페이지 자체를 캐싱하는 풀라우트 캐시까지 삭제됨 (프로덕션 모드로 확인해보기)
        // .next 폴더: generateStaticParams에 의해 1, 2, 3 페이지 만들어진 상태
        // 1 페이지 보면 기존 리뷰들도 적혀있음
        // 이 상태에서 새로운 리뷰를 쓰면? > 1 페이지에 반영되지 않음
        // 풀라우트 캐시가 제거가 되었을 뿐 업데이트가 되지는 않았음(파일은 남아있지만 사실상 무효화?)
        // 따라서 revalidatePath는 무효화하기만 할 뿐 풀라우트 캐시를 업데이트 하지는 않는다는 것을 알게 됨~
        // 여기서 새로고침을 하게 되면?
        // 캐시된 데이터 사용할 수 없어서 다이나믹 페이지처럼 작동
        // 그제서야 풀라우트 캐시로서 1 페이지에 반영됨
        // 즉 1. 재렌더링 할 때는 다이나믹 페이지로 만들어지고
        // 2. 새로고침 했을 때는 다이나믹 페이지로 만들어진 후 원래대로 풀라우트 캐시로 저장됨
        // 3. 다시 새로고침 했을 때는 풀라우트 캐시에 저장된 페이지를 보냄
        // 이렇게 돌아가는 이유는? 최신 데이터를 반영하기 위해서!

        // 1. 특정 주소에 해당하는 페이지만 재검증
        revalidatePath(`/book/${bookId}`);
        // ** 다양한 재검증 방식 살펴보기
        // 여기서는 안 쓰지만 알아두면 쓰기 좋음

        // 2. 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath("book/[id]", "page");

        // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
        // revalidatePath("/(with-searchbar)", "layout");

        // 4. 모든 데이터 재검증
        // revalidatePath("/", "layout");

        // 5. 태그 기준 데이터 캐시 재검증
        // revalidateTag("tag");
        // 태그: fetch에 cache 옵션 중 하나
        // BookDetail의 fetch 메서드에서
        // { next: { tags: [`review-${bookId}`] } }로 설정한 후
        revalidateTag(`review-${bookId}`);
        // 해당 태그를 가진 모든 데이터 캐시 재검증
        // 사실 이게 1번 방법보다 더 효과적일 수 있음
        // 1번 방법은 해당 페이지의 모든 컴포넌트를 재검증함
        // 이 방법은 재검증 하고 싶은 데이터만 재검증할 수 있어서 효과적
    } catch (err) {
        console.error(err);
        return;
    }

    console.log(content, author);
}
