'use server';
// ** 지금처럼 서버 액션을 별도의 파일로 분리할 때는
// use server을 최상단에 적어주는 게 좋다

export async function createReviewAction(formData: FormData) {
    // ** 이제는 컴포넌트에서 받아온 props를 사용할 수 없기 때문에 formData로 받아와야 함
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();
    // 주의할 점: FormDataEntryValue | null라는 타입이 지정되어있음, 지금은 문자열만 다루기 때문에 FormDataEntryValue(문자열, 파일 모두 다룸)은 필요 없음.
    // 따라서 formData에 해당 값이 있을 때는 string으로 바꿔주면 됨.

    if (!bookId || !content || !author) {
        return;
    }
    // ** 이제 DB에 추가할 거임
    // DB에 직접 접근하려면 부가적으로 해야할 일들이 많아짐 > 배보다 배꼽이 커지는.. 실습 흐름이 끊길 수 있음
    // 가장 중요한 것은 서버 액션 응용 방법을 배우는 것이기 때문에
    // 지금은 리뷰 API 사용하자! (Swagger 참고)

    // ** 예외 처리: content나 author 없으면 보내면 안 됨
    // 1. 서버 액션 내에서 처리
    // 2. input 태그에서 처리 (required)

    // ** 이제 API를 호출할 것임
    // API는 항상 실패할 가능성이 있기 때문에 try-catch 필수
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: 'POST',
                body: JSON.stringify({ bookId, content, author }),
            }
        );
        console.log(response.status);
    } catch (err) {
        console.error(err);
        return;
    }

    console.log(content, author);
    // ** 진짜 등록되었는지 확인하기
    // 백엔드 서버에서 npx prisma studio: 현재 DB 조회할 수 있는 대시보드 나타남 (supabase)

    // ** 가독성을 위해 서버액션 파일 분리하기

    // 리뷰 에디터 컴포넌트를 클라이언트 컴포넌트를 만들거나
    // 직접 API를 만들면 되는데 굳이 서버액션 사용하는 이유: 코드가 간결해서
    // 만약 API 사용하려면? 별도의 파일 추가, 경로 추가, 예외 처리 등
    // 간단한 기능만 필요한 경우에는 서버 액션을 사용하면 아주 좋음
    // 서버 액션은 서버에서만 돌아가기 때문에 클라이언트인 브라우저에서는 호출만 할 수 있을 뿐 코들르 전달받지는 않음
    // 따라서 보안상으로 민감하거나 중요한 데이터를 다룰 때도 유용할 수 있음
}
