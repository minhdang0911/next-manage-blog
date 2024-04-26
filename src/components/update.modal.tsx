'use client';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProp {
    showModalUpdate: boolean;
    setShowModalUpdate: (v: boolean) => void;
    blog: IBLOG | null;
    setBlog: (value: IBLOG | null) => void;
}

function UpdateModal(props: IProp) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
        }
    }, [blog]);

    const handleSubmitForm = () => {
        if (!title) {
            toast.error('Vui lòng nhập tiêu đề');
            return;
        }

        if (!author) {
            toast.error('Vui lòng nhập tác giả');
            return;
        }

        if (!content) {
            toast.error('Vui lòng nhập nội dung');
            return;
        }
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'Application/json text/plain',
                'Content-Type': 'application/json', // Sửa 'Content Type' thành 'Content-Type'
            },
            body: JSON.stringify({ title, author, content }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    toast.success('Cap Nhat Blog thành công');
                    handleCloseModal();
                    mutate('http://localhost:8000/blogs');
                } else {
                    toast.error('Cap nhat thất bại');
                }
            });
    };

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setShowModalUpdate(false);
        setBlog(null);
    };

    return (
        <>
            <Modal
                size="lg"
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhat Blogs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tác giả</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitForm()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;
