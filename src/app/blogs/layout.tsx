import { Metadata } from 'next';

export const metadata = {
    title: 'Danh sách blogs',
    description: 'Giao diện danh sách Blogs',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
