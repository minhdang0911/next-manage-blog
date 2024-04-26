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
import Modal from 'react-bootstrap/Modal';
import './app.table.css';

interface Iprops {
    blogs: IBLOG[];
}

interface IDeleteModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({ show, onHide, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa bài viết này?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

function AppTable(props: Iprops) {
    const { blogs } = props;
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [blog, setBlog] = useState<IBLOG | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDeleteBlog = (id: number) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            fetch(`http://localhost:8000/blogs/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
            setShowDeleteModal(false);
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

                                <DeleteModal
                                    show={showDeleteModal}
                                    onHide={() => setShowDeleteModal(false)}
                                    onDelete={confirmDelete}
                                />
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
