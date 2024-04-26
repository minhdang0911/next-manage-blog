'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
import { Card, Button } from 'react-bootstrap'; // Import các component card và button từ Bootstrap

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Giao diện trang chủ',
};

export default function Home() {
    // Assume blogs is an array of blog objects
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs data
        fetch('http://localhost:8000/blogs')
            .then((response) => response.json())
            .then((data) => setBlogs(data));
    }, []);

    return (
        <main>
            <div className="container mt-5">
                <div className="row">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-md-4 mb-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                    <Link href={`/blogs/${blog.id}`}>
                                        <Button variant="primary">Xem</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
