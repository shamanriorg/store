// Основные типы для проекта

export interface Product {
  id: string
  name: string
  type: string
  price: number
  image: string
  inStock: boolean
  description?: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export interface Order {
  id: string
  user: User
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: Date
}

export type ProductCategory = 'scarfs' | 'cards' | 'fabrics' | 'prints' | 'packs'
