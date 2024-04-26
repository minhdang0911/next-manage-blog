'use client';
import { log } from 'console';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Iprops {
    blogs: IBLOG[];
}

function AppTable(props: Iprops) {
    const { blogs } = props;
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [blog, setBlog] = useState<IBLOG | null>(null);

    const handleDeleteBlog = (id: number) => {
        if (confirm(`Bạn có muốn xóa Blogs có id=${id}`)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'Application/json text/plain',
                    'Content-Type': 'application/json', // Sửa 'Content Type' thành 'Content-Type'
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        toast.success('Xóa thành công');
                        mutate('http://localhost:8000/blogs');
                    } else {
                        toast.error('Xóa thất bại');
                    }
                });
        }
    };

    return (
        <>
            <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Table Blogs</h3>
                <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
                    Thêm mới
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>
                                    {' '}
                                    <Button variant="outline-primary">
                                        <Link style={{ textDecoration: 'none' }} href={`/blogs/${item.id}`}>
                                            Xem
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline-warning"
                                        className="mx-3"
                                        onClick={() => {
                                            setBlog(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => handleDeleteBlog(item.id)}>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}
            />
        </>
    );
}

export default AppTable;
