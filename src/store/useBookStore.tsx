import { create } from 'zustand'
import { toast } from 'react-toastify'
import { getBooks, createBook, updateBook, deleteBook } from '../api/BookApi'
import type { BookType, BookPayload, BookUpdateType } from '../types'

// Create a helper function for loading and error management
const setLoadingState = (set: any, loading: boolean, error: string | null = null) => {
  set({ loading, error })
}

const showToast = (message: string, success: boolean) => {
  if (success) {
    toast.success(message)
  } else {
    toast.error(message)
  }
}

type BookStore = {
  books: BookType[]
  loading: boolean
  error: string | null
  fetchBooks: () => Promise<void>
  addBook: (payload: BookPayload) => Promise<void>
  updateBook: (id: string, payload: BookUpdateType) => Promise<void>
  deleteBook: (id: string) => Promise<void>
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,

  // Fetch all books
  fetchBooks: async () => {
    setLoadingState(set, true)
    try {
      const res = await getBooks()
      set({ books: res.data, loading: false })
    } catch (err: any) {
      const message = err.message || 'Failed to fetch books'
      showToast(message, false)
      setLoadingState(set, false, message)
    }
  },

  // Add a new book
  addBook: async (payload) => {
    setLoadingState(set, true)
    try {
      const res = await createBook(payload)
      set((state) => ({
        books: [res.data, ...state.books],
        loading: false,
      }))
      showToast('Book added successfully!', true)
    } catch (err: any) {
      const message = err.message || 'Failed to add book'
      showToast(message, false)
      setLoadingState(set, false, message)
    }
  },

  // Update an existing book
  updateBook: async (id, payload) => {
    setLoadingState(set, true)
    try {
      const res = await updateBook(id, payload)
      set((state) => ({
        books: state.books.map((book) =>
          book._id === id ? res.data : book
        ),
        loading: false,
      }))
      showToast('Book updated successfully!', true)
    } catch (err: any) {
      const message = err.message || 'Failed to update book'
      showToast(message, false)
      setLoadingState(set, false, message)
    }
  },

  // Delete a book
  deleteBook: async (id) => {
    setLoadingState(set, true)
    try {
      await deleteBook(id)
      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
        loading: false,
      }))
      showToast('Book deleted successfully!', true)
    } catch (err: any) {
      const message = err.message || 'Failed to delete book'
      showToast(message, false)
      setLoadingState(set, false, message)
    }
  },
}))
