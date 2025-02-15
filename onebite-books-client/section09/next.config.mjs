// Next app 옵션 설정하는 파일
/** @type {import('next').NextConfig} */
const nextConfig = {
    // 데이터 페칭이 발생할 때마다 로그 출력
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        domains: ['shopping-phinf.pstatic.net'],
    },
};

export default nextConfig;
