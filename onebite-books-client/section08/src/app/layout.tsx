import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import { BookData } from '@/types';
import { ReactNode } from 'react';

async function Footer() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'no-cache' }
    );
    if (!response.ok) {
        return <footer>제작 @chopinoff</footer>;
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return (
        <footer>
            <div>제작 @chopinoff</div>
            <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
        </footer>
    );
}

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: ReactNode;
}>) {
    // 정리
    // /로 접속: children은 (@with-searchbar)\page.tsx, modal은 @modal\default.tsx
    // book/1로 접속: children은 (.)book\[id]\page.tsx가 아니라 왜 index.tsx를 유지?
    // > 인터셉팅 라우트가 modal에 이미 존재하므로 원래는 book\[id]\page.tsx로 가야하는 걸 뺏기고 그냥 예전 페이지가 뜨는 것..? 일단 이렇게 외우자
    // modal은 (.)book\[id]\page.tsx
    return (
        <html lang="en">
            <body>
                <div className={style.container}>
                    <header>
                        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
                    </header>
                    <main>{children}</main>
                    <Footer />
                </div>
                {modal}
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
