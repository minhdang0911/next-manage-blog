'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import '@/styles/App.css';
import AppTable from '@/components/app.table';
import { useEffect } from 'react';

export default function Home() {
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
        </main>
    );
}
