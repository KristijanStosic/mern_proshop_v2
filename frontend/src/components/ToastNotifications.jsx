import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastNotifications = () => {
  return (
    <Toaster reverseOrder={false} position='bottom' toastOptions={{
      duration: 5000,
      success: {
        style: {
          border: '1px solid #2D3748',
          padding: '16px',
          color: '#2D3748',
          fontWeight: 'bolder',
          backgroundColor: '#E2E8F0'
        },
        iconTheme: {
          primary: '#1A202C',
          secondary: '#FFFAEE',
        },
      },
      error: {
        style: {
          border: '1px solid crimson',
          padding: '16px',
          color: 'crimson',
          fontWeight: 'bolder',
          backgroundColor: '#E2E8F0',
        },
        iconTheme: {
          primary: 'crimson',
          secondary: '#FFFAEE',
        },
      }
    }

    } />
  )
}

export default ToastNotifications