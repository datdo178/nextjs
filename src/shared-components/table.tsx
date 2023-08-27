'use client'

import { Button } from 'react-bootstrap';
import CreateModal from "@/shared-components/create.modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AppTable(props: Blogs) {
  const route = useRouter();
  const { blogs } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({
    id: 0,
    title: '',
    author: '',
    content: ''
  });

  const openBlog = (id: number | string) => {
    route.push(`/blogs/${id}`);
  }

  const deleteBlog = (id: number) => {
    if (confirm(`Do you want to delete blog with id: ${id}?`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.status)
        .then(res => {
          if (res === 200) {
            toast.success('Deleted blog!');
            mutate('http://localhost:8000/blogs');
          }
        });
    }
  }

  return <>
    <div className="d-flex justify-content-between my-3">
      <h3>Table Blogs</h3>
      <Button
        variant="success"
        className="mx-2"
        onClick={() => setShowModal(true)}
      >
        Add new
      </Button>
    </div>
    <table className="table table-hover table-bordered">
      <thead>
      <tr>
        <th scope="col">No.</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      {
        blogs?.sort((a, b) => b.id - a.id)
          .map(blog => {
          return (
            <tr key={`id-${blog.id}`}>
              <th scope="row">{blog.id}</th>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <Button
                  variant="primary"
                  className="mx-2"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="warning"
                  className="mx-2"
                  onClick={() => openBlog(blog.id)}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    <CreateModal
      showModal={showModal}
      setShowModal={setShowModal}
      setSelectedBlog={setSelectedBlog}
      selectedBlog={selectedBlog}
    />
  </>
}
