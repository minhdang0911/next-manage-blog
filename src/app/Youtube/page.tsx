'use client';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

function Youtube() {
    const router = useRouter();
    const handleBtn = () => {
        router.push('/');
    };
    return (
        <>
            <div>This is a page Youtube</div>
        </>
    );
}

export default Youtube;
