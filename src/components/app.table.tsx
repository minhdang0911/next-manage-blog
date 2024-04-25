'use client';
import { log } from 'console';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreateModal from './create.modal';
import { useState } from 'react';

interface Iprops {
    blogs: IBLOG[];
}

function AppTable(props: Iprops) {
    const { blogs } = props;
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    console.log('props', blogs);

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
                    {blogs?.map((blog) => {
                        return (
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>
                                    {' '}
                                    <Button variant="outline-primary">Xem</Button>
                                    <Button variant="outline-warning" className="mx-3">
                                        Sửa
                                    </Button>
                                    <Button variant="outline-danger">Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
        </>
    );
}

export default AppTable;
