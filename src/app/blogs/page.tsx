'use client'

import AppTable from "@/shared-components/table";
import useSWR from "swr";

export default function Blogs() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
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

  return <>
    <AppTable blogs={data}/>
  </>
}
