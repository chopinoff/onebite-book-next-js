// 현재 프로젝트에서는 필요 없지만 복잡한 페이지를 만들 때 필요하기 때문에 학습
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
    children,
    sidebar,
    feed,
}: {
    children: ReactNode;
    sidebar: ReactNode;
    feed: ReactNode;
}) {
    return (
        <div>
            <div>
                <Link href={'/parallel'}>parallel</Link>
                &nbsp;
                <Link href={'/parallel/setting'}>parallel/setting</Link>
            </div>
            <br />
            {/* /parallel/setting으로 갈 경우
            feed: @feed/setting/page.tsx
            sidebar, children: setting 폴더가 없어서 404 Not Found 상황이지만 슬롯에서는 이전 페이지(기존 페이지)를 유지하도록 처리함 */}
            {/* 주의: 슬롯이 예전 페이지를 유지하는 것은 오직 Link 컴포넌트로
            브라우저에서 클라이언트 사이드 렌더링 방식으로 이동할 때만 해당 됨 */}
            {/* 새로고침하면 404 Not Found 뜸 */}
            {/* 이유: 당연함! 이전 페이지가 어디인지 모르기 때문 */}
            {/* 그래서 이전 페이지를 알게 하기 위해서 (404 Not Found로 보내는 것을 방지하기 위해서) default.tsx를 만듦 */}
            <div>{sidebar}</div>
            <div>{feed}</div>
            <div>{children}</div>
        </div>
    );
}
