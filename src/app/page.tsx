'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import '@/styles/App.css';
import AppTable from '@/components/app.table';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR('http://localhost:8000/blogs', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    console.log('data', data);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(' http://localhost:8000/blogs');
    //         const data = await res.json();
    //         console.log('res', data);
    //     };
    //     fetchData();
    // }, []);

    return (
        <main>
            <ul>
                <li className="red">
                    <Link href={'/Facebook'}>FaceBook</Link>
                </li>
                <li>
                    {' '}
                    <Link href={'/Youtube'}>Youtube</Link>
                </li>

                <li>
                    <Link href={'/Tiktok'}>Tiktok</Link>
                </li>
            </ul>
            <AppTable />
        </main>
    );
}
