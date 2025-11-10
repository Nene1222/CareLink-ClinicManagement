"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Plus, Search, Edit2, Trash2 } from "lucide-react"

interface Staff {
  id: string
  name: string
  role: string
  email: string
  phone: string
  department: string
  status: "active" | "inactive"
}

const initialStaff: Staff[] = [
  {
    id: "S001",
    name: "Dr. Sarah Johnson",
    role: "General Physician",
    email: "sarah.johnson@clinic.com",
    phone: "+1-555-0101",
    department: "General Medicine",
    status: "active",
  },
  {
    id: "S002",
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    email: "michael.chen@clinic.com",
    phone: "+1-555-0102",
    department: "Cardiology",
    status: "active",
  },
  {
    id: "S003",
    name: "Nurse Emma Wilson",
    role: "Registered Nurse",
    email: "emma.wilson@clinic.com",
    phone: "+1-555-0103",
    department: "Nursing",
    status: "active",
  },
  {
    id: "S004",
    name: "Dr. James Martinez",
    role: "Pediatrician",
    email: "james.martinez@clinic.com",
    phone: "+1-555-0104",
    department: "Pediatrics",
    status: "active",
  },
  {
    id: "S005",
    name: "Lab Technician Robert Brown",
    role: "Lab Technician",
    email: "robert.brown@clinic.com",
    phone: "+1-555-0105",
    department: "Laboratory",
    status: "inactive",
  },
]

const departments = ["General Medicine", "Cardiology", "Pediatrics", "Nursing", "Laboratory", "Administration"]
const roles = [
  "General Physician",
  "Cardiologist",
  "Pediatrician",
  "Registered Nurse",
  "Lab Technician",
  "Receptionist",
  "Administrator",
]

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    department: "",
    status: "active" as const,
  })

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSaveStaff = () => {
    if (formData.name && formData.email && formData.phone) {
      if (selectedStaff) {
        // Edit existing
        setStaff(staff.map((s) => (s.id === selectedStaff.id ? { ...s, ...formData } : s)))
      } else {
        // Add new
        const newStaff: Staff = {
          id: `S${String(staff.length + 1).padStart(3, "0")}`,
          ...formData,
        }
        setStaff([...staff, newStaff])
      }
      resetForm()
      setIsDialogOpen(false)
    }
  }

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id))
  }

  const openEditDialog = (member: Staff) => {
    setSelectedStaff(member)
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      department: member.department,
      status: member.status,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setSelectedStaff(null)
    setFormData({
      name: "",
      role: "",
      email: "",
      phone: "",
      department: "",
      status: "active",
    })
  }

  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "active").length,
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Staff Management" subtitle="View and manage clinic staff members" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Staff Directory</CardTitle>
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open)
                if (!open) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                  className="bg-[#5B6EF5] hover:bg-[#4A5DE4]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
                  <DialogDescription>
                    {selectedStaff
                      ? "Update staff member information"
                      : "Fill in the details to add a new staff member"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@clinic.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => setFormData({ ...formData, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1-555-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleSaveStaff} className="w-full bg-[#5B6EF5] hover:bg-[#4A5DE4]">
                    {selectedStaff ? "Update" : "Add"} Staff Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredStaff.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground ml-13">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {member.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {member.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(member)}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteStaff(member.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStaff.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No staff members found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
