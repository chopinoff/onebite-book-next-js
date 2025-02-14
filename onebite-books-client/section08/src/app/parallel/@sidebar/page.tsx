export default function Page() {
    // Slot(슬롯): @로 시작하는 폴더, 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더
    // 여기서 page.tsx를 만들면(이 파일) 부모 layout.tsx에 props로 자동으로 전달되고 이름은 sidebar
    // 만약 반영 안 되면 .next 지우고 다시 시도하면 될 것임

    // Slot은 Route Group처럼 URL 경로에는 아무런 영향을 미치지 않음
    // 원래 page.tsx를 만들면 children이라는 props로 들어가는 것도
    // @children/page.tsx와 동일하다 (근데 걍 page.tsx로 간편하게 씀)
    return <div>@sidebar</div>;
}
