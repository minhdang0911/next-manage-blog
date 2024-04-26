'use client';
import AppTable from '@/components/app.table';
import useSWR from 'swr';

const BlogPage = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR('http://localhost:8000/blogs', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    console.log('data', data);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(' http://localhost:8000/blogs');
    //         const data = await res.json();
    //         console.log('res', data);
    //     };
    //     fetchData();
    // }, []);

    if (!data) {
        return <div>...Loading</div>;
    }

    return (
        <div className="mt-3">
            <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
        </div>
    );
};

export default BlogPage;
