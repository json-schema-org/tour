import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-8">
          <span className="text-red-400 mr-2">{'{'}</span>
          <span className="text-red-500">404</span>
          <span className="text-gray-400 ml-2">{'}'}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you{`'`}re looking for doesn{`'`}t exist.
        </p>
        <Link href="/" className="inline-block">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}