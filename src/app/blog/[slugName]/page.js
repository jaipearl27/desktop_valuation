import BlogPostPage from './BlogPostPage';

export default async function page({ params }) {
        console.log(params)
  return (
    <BlogPostPage slugname={params?.slugName}/>
  );
}

