"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Permission {
  id: string
  name: string
  description: string
  module: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdDate: string
  status: "active" | "inactive"
}

const allPermissions: Permission[] = [
  // Dashboard Permissions
  { id: "dashboard-view", name: "View Dashboard", description: "Access dashboard and statistics", module: "Dashboard" },
  {
    id: "dashboard-export",
    name: "Export Dashboard Data",
    description: "Export dashboard reports",
    module: "Dashboard",
  },

  // Appointment Permissions
  {
    id: "appointment-view",
    name: "View Appointments",
    description: "Access appointments list",
    module: "Appointments",
  },
  {
    id: "appointment-create",
    name: "Create Appointments",
    description: "Create new appointments",
    module: "Appointments",
  },
  {
    id: "appointment-edit",
    name: "Edit Appointments",
    description: "Edit existing appointments",
    module: "Appointments",
  },
  { id: "appointment-delete", name: "Delete Appointments", description: "Delete appointments", module: "Appointments" },

  // Attendance Permissions
  { id: "attendance-view", name: "View Attendance", description: "Access attendance records", module: "Attendance" },
  {
    id: "attendance-checkin",
    name: "Check In/Out",
    description: "Perform attendance check-in and check-out",
    module: "Attendance",
  },
  {
    id: "attendance-manage",
    name: "Manage Attendance",
    description: "Edit and manage attendance records",
    module: "Attendance",
  },
  {
    id: "attendance-reports",
    name: "Attendance Reports",
    description: "View attendance reports and analytics",
    module: "Attendance",
  },

  // Inventory Permissions
  { id: "inventory-view", name: "View Inventory", description: "Access inventory list", module: "Inventory" },
  { id: "inventory-add", name: "Add Items", description: "Add new inventory items", module: "Inventory" },
  { id: "inventory-edit", name: "Edit Items", description: "Edit inventory items", module: "Inventory" },
  { id: "inventory-delete", name: "Delete Items", description: "Delete inventory items", module: "Inventory" },
  { id: "inventory-adjust", name: "Adjust Stock", description: "Adjust stock quantities", module: "Inventory" },

  // Staff Permissions
  { id: "staff-view", name: "View Staff", description: "Access staff directory", module: "Staff" },
  { id: "staff-create", name: "Add Staff", description: "Add new staff members", module: "Staff" },
  { id: "staff-edit", name: "Edit Staff", description: "Edit staff information", module: "Staff" },
  { id: "staff-delete", name: "Delete Staff", description: "Delete staff records", module: "Staff" },

  // Patient Permissions
  { id: "patient-view", name: "View Patients", description: "Access patient records", module: "Patients" },
  { id: "patient-create", name: "Add Patients", description: "Create new patient records", module: "Patients" },
  { id: "patient-edit", name: "Edit Patients", description: "Edit patient information", module: "Patients" },
  { id: "patient-delete", name: "Delete Patients", description: "Delete patient records", module: "Patients" },

  // Medical Records Permissions
  {
    id: "medical-records-view",
    name: "View Medical Records",
    description: "Access medical records",
    module: "Medical Records",
  },
  {
    id: "medical-records-create",
    name: "Create Records",
    description: "Create new medical records",
    module: "Medical Records",
  },
  { id: "medical-records-edit", name: "Edit Records", description: "Edit medical records", module: "Medical Records" },
  {
    id: "medical-records-delete",
    name: "Delete Records",
    description: "Delete medical records",
    module: "Medical Records",
  },
  {
    id: "medical-records-download",
    name: "Download Records",
    description: "Download medical records as PDF",
    module: "Medical Records",
  },

  // Reports Permissions
  { id: "reports-view", name: "View Reports", description: "Access reports and analytics", module: "Reports" },
  { id: "reports-export", name: "Export Reports", description: "Export reports", module: "Reports" },

  // Role Permissions
  { id: "roles-manage", name: "Manage Roles", description: "Create and manage roles", module: "Roles & Permissions" },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access",
      permissions: allPermissions.map((p) => p.id),
      userCount: 2,
      createdDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Doctor",
      description: "Medical professionals with patient access",
      permissions: [
        "dashboard-view",
        "appointment-view",
        "appointment-create",
        "appointment-edit",
        "patient-view",
        "patient-edit",
        "medical-records-view",
        "medical-records-create",
        "medical-records-edit",
        "medical-records-download",
        "attendance-view",
        "attendance-checkin",
      ],
      userCount: 8,
      createdDate: "2024-01-15",
      status: "active",
    },
    {
      id: "3",
      name: "Nurse",
      description: "Nursing staff with limited access",
      permissions: [
        "dashboard-view",
        "appointment-view",
        "patient-view",
        "patient-edit",
        "medical-records-view",
        "medical-records-edit",
        "attendance-view",
        "attendance-checkin",
        "inventory-view",
        "inventory-adjust",
      ],
      userCount: 12,
      createdDate: "2024-01-15",
      status: "active",
    },
    {
      id: "4",
      name: "Receptionist",
      description: "Front desk staff",
      permissions: [
        "dashboard-view",
        "appointment-view",
        "appointment-create",
        "appointment-edit",
        "patient-view",
        "patient-create",
        "attendance-view",
        "attendance-checkin",
      ],
      userCount: 4,
      createdDate: "2024-01-20",
      status: "active",
    },
  ])

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Role | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const modules = Array.from(new Set(allPermissions.map((p) => p.module)))

  const handleAddRole = () => {
    if (!formData.name) return
    const newRole: Role = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      permissions: selectedPermissions,
      userCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
      status: "active",
    }
    setRoles([...roles, newRole])
    setFormData({ name: "", description: "" })
    setSelectedPermissions([])
    setIsAddOpen(false)
  }

  const handleEditRole = () => {
    if (!selectedRole || !formData.name) return
    setRoles(
      roles.map((role) =>
        role.id === selectedRole.id
          ? { ...role, name: formData.name, description: formData.description, permissions: selectedPermissions }
          : role,
      ),
    )
    setFormData({ name: "", description: "" })
    setSelectedPermissions([])
    setIsEditOpen(false)
    setSelectedRole(null)
  }

  const handleDeleteRole = (role: Role) => {
    setRoles(roles.filter((r) => r.id !== role.id))
    setDeleteConfirm(null)
  }

  const openEditDialog = (role: Role) => {
    setSelectedRole(role)
    setFormData({ name: role.name, description: role.description })
    setSelectedPermissions(role.permissions)
    setIsEditOpen(true)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((p) => p !== permissionId) : [...prev, permissionId],
    )
  }

  const getModulePermissions = (module: string) => {
    return allPermissions.filter((p) => p.module === module)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
            <p className="text-muted-foreground mt-2">Manage user roles and their permissions</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="h-5 w-5" />
                Add New Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>Add a new role with specific permissions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Lab Technician"
                  />
                </div>
                <div>
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role's responsibilities"
                    rows={3}
                  />
                </div>
                <div className="space-y-4">
                  <Label>Assign Permissions</Label>
                  {modules.map((module) => (
                    <div key={module} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-foreground">{module}</h3>
                      <div className="space-y-2">
                        {getModulePermissions(module).map((permission) => (
                          <div key={permission.id} className="flex items-start gap-3">
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <label htmlFor={permission.id} className="flex-1 cursor-pointer">
                              <p className="font-medium text-sm">{permission.name}</p>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRole} className="bg-primary">
                  Create Role
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <Card key={role.id} className="border border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{role.name}</CardTitle>
                      <Badge variant={role.status === "active" ? "default" : "secondary"}>
                        {role.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">{role.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isEditOpen && selectedRole?.id === role.id} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(role)} className="gap-2">
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      {selectedRole?.id === role.id && (
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Role: {selectedRole.name}</DialogTitle>
                            <DialogDescription>Update role details and permissions</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Role Name</Label>
                              <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-desc">Description</Label>
                              <Textarea
                                id="edit-desc"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-4">
                              <Label>Assign Permissions</Label>
                              {modules.map((module) => (
                                <div key={module} className="border rounded-lg p-4">
                                  <h3 className="font-semibold mb-3 text-foreground">{module}</h3>
                                  <div className="space-y-2">
                                    {getModulePermissions(module).map((permission) => (
                                      <div key={permission.id} className="flex items-start gap-3">
                                        <Checkbox
                                          id={`edit-${permission.id}`}
                                          checked={selectedPermissions.includes(permission.id)}
                                          onCheckedChange={() => togglePermission(permission.id)}
                                        />
                                        <label htmlFor={`edit-${permission.id}`} className="flex-1 cursor-pointer">
                                          <p className="font-medium text-sm">{permission.name}</p>
                                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end mt-6">
                            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditRole} className="bg-primary">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(role)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Users with this role</span>
                  <span className="text-lg font-semibold text-foreground">{role.userCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Permissions assigned</span>
                  <span className="text-lg font-semibold text-foreground">{role.permissions.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {modules.map((module) => {
                    const modulePerms = getModulePermissions(module)
                    const assignedCount = modulePerms.filter((p) => role.permissions.includes(p.id)).length
                    return (
                      <Badge key={module} variant="outline" className="text-xs">
                        {module}: {assignedCount}/{modulePerms.length}
                      </Badge>
                    )
                  })}
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Created: {role.createdDate}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{deleteConfirm?.name}" role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> {deleteConfirm?.userCount} user(s) are assigned to this role.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteRole(deleteConfirm)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
