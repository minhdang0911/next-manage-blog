'use client';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

function Facebook() {
    const router = useRouter();
    const handleBtn = () => {
        router.push('/');
    };
    return (
        <>
            <div>This is a page FaceBook</div>
            <div>
                <button onClick={() => handleBtn()}>Bakc</button>
                <Button variant="outline-primary">Primary</Button>{' '}
            </div>
        </>
    );
}

export default Facebook;
