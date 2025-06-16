import { useEffect, useState } from 'react'
import { useBookStore } from '../../store/useBookStore'
import type { BookFormValues } from '../../types'
import BookForm from '../../components/BookForm'
import BookFilter from '../../components/BookFilter'
import BookList from '../../components/BookList'
import Header from '../../components/Header'

export const Book = () => {
  const [filter, setFilter] = useState<string>('all')
  const [editingBook, setEditingBook] = useState<BookFormValues | null>(null)

  const {
    books,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  } = useBookStore()

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const handleSubmit = async (data: BookFormValues) => {
    if (data._id) {
      await updateBook(data._id, data)
    } else {
      await addBook(data)
    }
    setEditingBook(null)
  }

  const handleDelete = async (id: string) => {
    await deleteBook(id)
  }

  const filteredBooks = filter === 'all'
    ? books
    : books.filter((book) => book.genre.includes(filter))

  return (
    <section
      className="min-h-screen bg-gray-100 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1950&q=80')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="bg-white/70 min-h-screen">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Book Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-1 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <BookForm onSubmit={handleSubmit} initialValues={editingBook} />
          </div>

          {/* Book List Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-2 flex flex-col backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">Book Library</h2>
                <p className="text-sm text-gray-600">Total: {books.length} books</p>
              </div>
              <div className="w-full sm:w-auto">
                <BookFilter filter={filter} setFilter={setFilter} />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[60vh] divide-y divide-gray-100">
              <BookList
                books={filteredBooks}
                onEdit={setEditingBook}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Book
