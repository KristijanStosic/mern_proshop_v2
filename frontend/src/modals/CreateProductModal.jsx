import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import CreateProductForm from './CreateProductForm'

const CreateProductModal = ({ openModal, closeModal }) => {
  return (
    <Modal
      show={openModal}
      onHide={closeModal}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateProductForm closeDialog={closeModal} />
      </Modal.Body>
    </Modal>
  )
}

export default CreateProductModal