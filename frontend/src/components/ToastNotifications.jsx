import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastNotifications = () => {
  return (
    <Toaster reverseOrder={false} position='bottom' toastOptions={{
      duration: 5000,
      success: {
        style: {
          border: '1px solid #334155',
          padding: '16px',
          color: '#334155',
          fontWeight: 'bolder',
          backgroundColor: '#e2e8f0'
        },
        iconTheme: {
          primary: '#334155',
          secondary: '#e2e8f0',
        },
      },
      error: {
        style: {
          border: '1px solid #ef4444',
          color: '#991b1b',
          padding: '16px',
          fontWeight: 'bolder',
          backgroundColor: '#e2e8f0',
        },
        iconTheme: {
          primary: '#991b1b',
          secondary: '#e2e8f0',
        },
      }
    }

    } />
  )
}

export default ToastNotifications