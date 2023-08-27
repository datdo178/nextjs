'use client'

import { Card } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from "swr";

export default function BlogDetails({ params }: { params: { id: string }}) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!data.id) {
    return <h4 className="my-3">Blog không tồn tại</h4>;
  }

  return <>
    <Link href={"/blogs"}>Go back</Link>
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Author: {data.author}</Card.Subtitle>
        <Card.Text>
          {data.content}
        </Card.Text>
      </Card.Body>
    </Card>
  </>
}
