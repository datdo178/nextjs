'use client'

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function CreateModal(props: {
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  setSelectedBlog: (blog: Blog) => void,
  selectedBlog?: Blog }) {
  const { showModal, setShowModal, setSelectedBlog, selectedBlog } = props;
  const [title, setTitle] = useState(selectedBlog?.title);
  const [author, setAuthor] = useState(selectedBlog?.author);
  const [content, setContent] = useState(selectedBlog?.content);

  useEffect(() => {
    setTitle(selectedBlog?.title);
    setAuthor(selectedBlog?.author);
    setContent(selectedBlog?.content);
  }, [selectedBlog])

  const handleClose = () => {
    setSelectedBlog({
      id: 0,
      title: '',
      author: '',
      content: ''
    })
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (selectedBlog?.id) {
      editBlog();
    } else {
      addBlog();
    }
    handleClose();
  }

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
    fetch(`http://localhost:8000/blogs/${selectedBlog?.id}`, {
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
      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
