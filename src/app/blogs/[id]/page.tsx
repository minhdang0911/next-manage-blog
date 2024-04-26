'use client';
import { log } from 'console';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';
const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
    const fetcher: Fetcher<IBLOG, string> = (url: string) => fetch(url).then((res) => res.json());
    // const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`http://localhost:8000/blogs/${params.id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    console.log('data', data);

    return (
        <div>
            <div className="my-3">
                <Link href={'/blogs'}>Go Back</Link>
            </div>
            <Card>
                <Card.Header>Tiêu đề: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>{data?.content}</Card.Text>
                </Card.Body>
                <Card.Footer>Tác giả: {data?.author}</Card.Footer>
            </Card>
        </div>
    );
};

export default ViewDetailBlog;
