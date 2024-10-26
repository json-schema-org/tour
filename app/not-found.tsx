
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 ">404</h1>
      <p className="mt-4 text-xl text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className='mt-4'>
        <span className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Go back home
        </span>
      </Link>
    </div>
  );
};

export default Custom404;
