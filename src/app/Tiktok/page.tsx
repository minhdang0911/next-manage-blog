'use client';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

function Tiktok() {
    const router = useRouter();
    const handleBtn = () => {
        router.push('/');
    };
    return (
        <>
            <div>This is a page Tiktok</div>
        </>
    );
}

export default Tiktok;
