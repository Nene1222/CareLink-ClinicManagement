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
import { Mail, Phone, Calendar, Plus, Search, Edit2, Trash2 } from "lucide-react"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  status: "active" | "inactive"
  lastVisit: string
}

const initialPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0201",
    dob: "1980-05-15",
    status: "active",
    lastVisit: "2025-01-15",
  },
  {
    id: "P002",
    name: "Emily Brown",
    email: "emily.brown@email.com",
    phone: "+1-555-0202",
    dob: "1985-08-22",
    status: "active",
    lastVisit: "2025-01-18",
  },
  {
    id: "P003",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1-555-0203",
    dob: "1975-03-10",
    status: "active",
    lastVisit: "2025-01-10",
  },
  {
    id: "P004",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1-555-0204",
    dob: "1992-11-30",
    status: "active",
    lastVisit: "2025-01-12",
  },
  {
    id: "P005",
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+1-555-0205",
    dob: "1988-07-18",
    status: "inactive",
    lastVisit: "2024-12-20",
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    status: "active" as "active" | "inactive",
  })

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSavePatient = () => {
    if (formData.name && formData.email && formData.phone && formData.dob) {
      if (selectedPatient) {
        // Edit existing
        setPatients(
          patients.map((p) =>
            p.id === selectedPatient.id ? { ...p, ...formData, lastVisit: selectedPatient.lastVisit } : p,
          ),
        )
      } else {
        // Add new
        const newPatient: Patient = {
          id: `P${String(patients.length + 1).padStart(3, "0")}`,
          ...formData,
          lastVisit: new Date().toISOString().split("T")[0],
        }
        setPatients([...patients, newPatient])
      }
      resetForm()
      setIsDialogOpen(false)
    }
  }

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  const openEditDialog = (patient: Patient) => {
    setSelectedPatient(patient)
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      dob: patient.dob,
      status: patient.status,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setSelectedPatient(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      status: "active",
    })
  }

  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.status === "active").length,
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Patient Management" subtitle="View and manage patient records" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Patient Directory</CardTitle>
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
                  Register Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedPatient ? "Edit Patient" : "Register New Patient"}</DialogTitle>
                  <DialogDescription>
                    {selectedPatient ? "Update patient information" : "Fill in the details to register a new patient"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="p-name">Full Name</Label>
                      <Input
                        id="p-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-email">Email</Label>
                      <Input
                        id="p-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="p-phone">Phone</Label>
                      <Input
                        id="p-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1-555-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-dob">Date of Birth</Label>
                      <Input
                        id="p-dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-status">Status</Label>
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
                  <Button onClick={handleSavePatient} className="w-full bg-[#5B6EF5] hover:bg-[#4A5DE4]">
                    {selectedPatient ? "Update" : "Register"} Patient
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
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-xs text-muted-foreground">ID: {patient.id}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground ml-13">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        DOB: {new Date(patient.dob).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
                    <div className="text-right">
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(patient)}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeletePatient(patient.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No patients found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
