import { Metadata } from 'next';

export const metadata = {
    title: 'Chi tiết blogs',
    description: 'Giao diện chi tiết Blogs',
};

export default function ViewDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
