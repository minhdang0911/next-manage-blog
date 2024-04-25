'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface IProp {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateModal(props: IProp) {
    const { showModalCreate, setShowModalCreate } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmitForm = () => {
        console.log('check data', title, author, content);
    };

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setShowModalCreate(false);
    };

    return (
        <>
            <Modal
                size="lg"
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới Blogs</Modal.Title>
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

export default CreateModal;
