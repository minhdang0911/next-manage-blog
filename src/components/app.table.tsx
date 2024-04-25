'use client';
import { log } from 'console';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface Iprops {
    blogs: IBLOG[];
}

function AppTable(props: Iprops) {
    const { blogs } = props;
    console.log('props', blogs);

    return (
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
    );
}

export default AppTable;
