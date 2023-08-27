'use client'

import { useState } from 'react';
import { mutate } from 'swr';
import { toast } from "react-toastify";
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function CreateModal(props: { btnName: string, blog?: Blog, children?: any }) {
  const { btnName, blog, children } = props;
  console.log(blog);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(blog?.title || '');
  const [author, setAuthor] = useState(blog?.author || '');
  const [content, setContent] = useState(blog?.content || '');

  const resetValue = () => {
    setTitle('');
    setAuthor('');
    setContent('');
  }

  const handleSubmit = () => {
    if (blog?.id) {
      editBlog();
    } else {
      addBlog();
    }

    handleClose();
  };
  const handleClose = () => {
    setShow(false);
    resetValue();
  };
  const addBlog = () => {
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.success(`Added blog: ${title}`);
          mutate('http://localhost:8000/blogs');
        }
      });
  }
  const editBlog = () => {
    fetch(`http://localhost:8000/blogs/${blog?.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.success(`Updated blog: ${title}`);
          mutate('http://localhost:8000/blogs');
        }
      });
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)}>
        {btnName}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
