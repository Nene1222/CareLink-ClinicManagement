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
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Plus,
  Search,
  CalendarDays,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  doctorName: string
  doctorRole: string
  date: string
  time: string
  room: string
  reason: string
  notes?: string
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "P001",
    doctorName: "Dr. Sarah Johnson",
    doctorRole: "General Physician",
    date: "2025-01-20",
    time: "09:00 AM",
    room: "Room 101",
    reason: "Regular checkup",
  },
  {
    id: "2",
    patientName: "Emily Brown",
    patientId: "P002",
    doctorName: "Dr. Michael Chen",
    doctorRole: "Cardiologist",
    date: "2025-01-20",
    time: "10:30 AM",
    room: "Room 203",
    reason: "Heart consultation",
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    patientId: "P003",
    doctorName: "Dr. Sarah Johnson",
    doctorRole: "General Physician",
    date: "2025-01-20",
    time: "02:00 PM",
    room: "Room 101",
    reason: "Follow-up visit",
  },
  {
    id: "4",
    patientName: "Lisa Anderson",
    patientId: "P004",
    doctorName: "Dr. James Martinez",
    doctorRole: "Pediatrician",
    date: "2025-01-21",
    time: "11:00 AM",
    room: "Room 105",
    reason: "Child vaccination",
  },
  {
    id: "5",
    patientName: "David Lee",
    patientId: "P005",
    doctorName: "Dr. Michael Chen",
    doctorRole: "Cardiologist",
    date: "2025-01-19",
    time: "03:00 PM",
    room: "Room 203",
    reason: "Post-surgery checkup",
  },
]

const rooms = ["Room 101", "Room 102", "Room 203", "Room 105", "Room 204"]
const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
]

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("calendar")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    doctorName: "",
    doctorRole: "",
    date: "",
    time: "",
    room: "",
    reason: "",
    notes: "",
  })

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getAppointmentForSlot = (room: string, time: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return appointments.find((apt) => apt.room === room && apt.time === time && apt.date === dateStr)
  }

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const openBookingDialog = (room: string, time: string) => {
    resetForm()
    setFormData((prev) => ({
      ...prev,
      room,
      time,
      date: selectedDate.toISOString().split("T")[0],
    }))
    setIsDialogOpen(true)
  }

  const handleCreateAppointment = () => {
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      ...formData,
    }
    setAppointments([...appointments, newAppointment])
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      patientName: "",
      patientId: "",
      doctorName: "",
      doctorRole: "",
      date: "",
      time: "",
      room: "",
      reason: "",
      notes: "",
    })
    setSelectedAppointment(null)
  }

  const openEditDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setFormData({
      ...appointment,
      notes: appointment.notes || "",
    })
    setIsDialogOpen(true)
  }

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.map((apt) => (apt.id === selectedAppointment.id ? { ...apt, ...formData } : apt)))
      setIsDialogOpen(false)
      resetForm()
    }
  }

  const stats = {
    total: appointments.length,
    today: appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length,
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Appointments" subtitle="Manage patient appointments and schedules" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>Appointments</CardTitle>
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className={viewMode === "calendar" ? "bg-[#5B6EF5] hover:bg-[#4A5DE4]" : ""}
                  >
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#5B6EF5] hover:bg-[#4A5DE4]" : ""}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </Button>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="bg-[#5B6EF5] hover:bg-[#4A5DE4]">
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{selectedAppointment ? "Edit Appointment" : "Schedule New Appointment"}</DialogTitle>
                    <DialogDescription>
                      {selectedAppointment
                        ? "Update appointment details"
                        : "Fill in the details to schedule a new appointment"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                          id="patientName"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          placeholder="Enter patient name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientId">Patient ID</Label>
                        <Input
                          id="patientId"
                          value={formData.patientId}
                          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                          placeholder="e.g., P001"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctorName">Doctor Name</Label>
                        <Select
                          value={formData.doctorName}
                          onValueChange={(value) => setFormData({ ...formData, doctorName: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                            <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                            <SelectItem value="Dr. James Martinez">Dr. James Martinez</SelectItem>
                            <SelectItem value="Dr. Emily White">Dr. Emily White</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctorRole">Specialization</Label>
                        <Select
                          value={formData.doctorRole}
                          onValueChange={(value) => setFormData({ ...formData, doctorRole: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General Physician">General Physician</SelectItem>
                            <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                            <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                            <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          placeholder="e.g., 09:00 AM"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="room">Room</Label>
                        <Select
                          value={formData.room}
                          onValueChange={(value) => setFormData({ ...formData, room: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms.map((room) => (
                              <SelectItem key={room} value={room}>
                                {room}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="e.g., Regular checkup"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Additional notes..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={selectedAppointment ? handleUpdateAppointment : handleCreateAppointment}
                      className="bg-[#5B6EF5] hover:bg-[#4A5DE4]"
                    >
                      {selectedAppointment ? "Update" : "Create"} Appointment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "calendar" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="font-semibold text-lg">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2 mb-2">
                      <div className="font-semibold text-sm text-muted-foreground">Time</div>
                      {rooms.map((room) => (
                        <div
                          key={room}
                          className="font-semibold text-sm text-center p-2 bg-[#5B6EF5] text-white rounded-lg"
                        >
                          {room}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
                          <div className="font-medium text-sm flex items-center text-muted-foreground">{time}</div>
                          {rooms.map((room) => {
                            const appointment = getAppointmentForSlot(room, time, selectedDate)
                            return (
                              <div key={`${room}-${time}`} className="min-h-[80px]">
                                {appointment ? (
                                  <Card
                                    className="h-full cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[#5B6EF5]"
                                    onClick={() => openEditDialog(appointment)}
                                  >
                                    <CardContent className="p-2">
                                      <div className="space-y-1">
                                        <p className="font-semibold text-xs truncate">{appointment.patientName}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          <User className="inline h-3 w-3 mr-1" />
                                          {appointment.doctorName}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ) : (
                                  <Card
                                    className="h-full cursor-pointer hover:bg-muted/50 transition-colors border-dashed"
                                    onClick={() => openBookingDialog(room, time)}
                                  >
                                    <CardContent className="p-2 flex items-center justify-center h-full">
                                      <p className="text-xs text-muted-foreground">Available</p>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#5B6EF5] rounded"></div>
                    <span className="text-sm">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dashed border-muted-foreground rounded"></div>
                    <span className="text-sm">Available</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by patient name, doctor, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                                  <Badge variant="outline">{appointment.patientId}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  <User className="inline h-3 w-3 mr-1" />
                                  {appointment.doctorName} - {appointment.doctorRole}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {appointment.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {appointment.room}
                              </div>
                            </div>
                            <p className="text-sm">
                              <span className="font-medium">Reason:</span> {appointment.reason}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(appointment)}>
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
