import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
;('use  client')
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  title: string
  description: string
}

export const Modal = ({ isOpen, onClose, children, title, description }: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
