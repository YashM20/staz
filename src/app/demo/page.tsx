'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { getUsers, addUser, updateUser, deleteUser } from '../actions/users'

interface User {
  id: number
  name: string
  age: number
  email: string
}

export default function DemoPage() {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      const { data, error } = await getUsers()
      if (error) throw new Error(error)
      setUsers(data || [])
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await addUser(formData)
      if (error) throw new Error(error)
      
      setFormData({ name: '', age: '', email: '' })
      fetchUsers()
      toast({
        title: 'Success',
        description: 'User added successfully'
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add user',
        variant: 'destructive'
      })
    }
  }

  const handleDeleteUser = async (id: number) => {
    try {
      const { error } = await deleteUser(id)
      if (error) throw new Error(error)
      
      fetchUsers()
      toast({
        title: 'Success',
        description: 'User deleted successfully'
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive'
      })
    }
  }

  const handleUpdateUser = async (id: number, newAge: number) => {
    try {
      const { error } = await updateUser(id, newAge)
      if (error) throw new Error(error)
      
      fetchUsers()
      toast({
        title: 'Success',
        description: 'User updated successfully'
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Drizzle Demo</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="mb-8 space-y-4 text-black">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded text-black "
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full p-2 border rounded text-black "
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded text-black "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-black -lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleUpdateUser(user.id, user.age + 1)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Increment Age
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 