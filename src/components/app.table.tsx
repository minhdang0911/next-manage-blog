'use client';
import { log } from 'console';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';

interface Iprops {
    blogs: IBLOG[];
}

function AppTable(props: Iprops) {
    const { blogs } = props;
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [blog, setBlog] = useState<IBLOG | null>(null);

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
                                    <Button variant="outline-primary">Xem</Button>
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
                                    <Button variant="outline-danger">Xóa</Button>
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
